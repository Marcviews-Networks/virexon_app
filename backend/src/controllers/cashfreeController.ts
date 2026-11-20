import { Response } from "express";
import { Types } from "mongoose";
import { AuthRequest } from "../middleware/authMiddleware.js";
import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";
import { cashfree } from "../config/cashfree.js";

export const createCashfreePayment = async (
  req: AuthRequest,
  res: Response
) => {
  let order: any = null;

  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { items, shippingAddress, phone, couponCode } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    if (!shippingAddress || !phone) {
      return res.status(400).json({
        success: false,
        message: "Shipping address and phone number are required",
      });
    }

    const normalizedPhone = String(phone).replace(/\D/g, "").slice(-10);

    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit Indian mobile number",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const productId = item.product || item.productId || item._id;
      const quantity = Number(item.quantity);

      if (!Types.ObjectId.isValid(productId) ||
          !Number.isInteger(quantity) ||
          quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid cart item",
        });
      }

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "A product in your cart was not found",
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} does not have enough stock`,
        });
      }

      const applicableTiers = (product.quantityPricing || [])
        .filter((tier) => quantity >= tier.quantity)
        .sort((a, b) => b.quantity - a.quantity);

      const unitPrice = applicableTiers.length > 0
        ? applicableTiers[0].price
        : product.price;

      subtotal += unitPrice * quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: unitPrice,
        quantity,
        image: product.images?.[0] || "",
      });
    }

    const normalizedCoupon = String(couponCode || "").trim().toUpperCase();

    if (normalizedCoupon && normalizedCoupon !== "GADGET5") {
      return res.status(400).json({
        success: false,
        message: "Invalid coupon code",
      });
    }

    const discount = normalizedCoupon === "GADGET5"
      ? subtotal * 0.05
      : 0;

    const totalAmount = Number((subtotal - discount).toFixed(2));

    if (totalAmount < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount",
      });
    }

    order = await Order.create({
      user: new Types.ObjectId(req.user.id),
      items: orderItems,
      shippingAddress,
      totalAmount,
      paymentMethod: "online",
      paymentStatus: "pending",
      status: "pending",
    });

    const cashfreeOrderId = `GG-${order._id.toString()}`;

    const response = await cashfree.PGCreateOrder({
      order_id: cashfreeOrderId,
      order_amount: totalAmount,
      order_currency: "INR",
      customer_details: {
        customer_id: user._id.toString(),
        customer_name: user.name,
        customer_email: user.email,
        customer_phone: normalizedPhone,
      },
      order_meta: {
        return_url: `${process.env.CLIENT_URL || "https://gadgetglam.store"}/payment/return?order_id=${cashfreeOrderId}`,
      },
    });

    const cashfreeData = response.data;

    if (!cashfreeData.payment_session_id) {
      throw new Error("Cashfree did not return a payment session");
    }

    order.cashfreeOrderId = cashfreeData.order_id;
    order.cashfreePaymentSessionId = cashfreeData.payment_session_id;
    await order.save();

    return res.status(201).json({
      success: true,
      message: "Payment session created",
      orderId: order._id,
      paymentSessionId: cashfreeData.payment_session_id,
    });
  } catch (error) {
    console.error("Cashfree create payment error:", error);

    if (order) {
      order.paymentStatus = "failed";
      await order.save().catch(console.error);
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create Cashfree payment",
    });
  }
};

export const verifyCashfreePayment = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { orderId } = req.body;

    if (!Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findOne({
      _id: orderId,
      user: req.user.id,
      paymentMethod: "online",
    });

    if (!order || !order.cashfreeOrderId) {
      return res.status(404).json({
        success: false,
        message: "Payment order not found",
      });
    }

    if (order.paymentStatus === "paid") {
      return res.status(200).json({
        success: true,
        paymentStatus: "paid",
        order,
      });
    }

    const response = await cashfree.PGFetchOrder(order.cashfreeOrderId);
    const payment = response.data;

    if (
      payment.order_amount !== order.totalAmount ||
      payment.order_currency !== "INR"
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details do not match",
      });
    }

    if (payment.order_status === "PAID") {
      order.paymentStatus = "paid";
      order.status = "confirmed";
      await order.save();

      return res.status(200).json({
        success: true,
        paymentStatus: "paid",
        order,
      });
    }

    if (
      payment.order_status === "EXPIRED" ||
      payment.order_status === "TERMINATED"
    ) {
      order.paymentStatus = "failed";
      await order.save();
    }

    return res.status(200).json({
      success: true,
      paymentStatus: order.paymentStatus,
      message: "Payment is not completed yet",
    });
  } catch (error) {
    console.error("Cashfree payment verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify payment",
    });
  }
};

export const handleCashfreeWebhook = async (
  req: any,
  res: Response
) => {
  try {
    const signature = req.headers["x-webhook-signature"];
    const timestamp = req.headers["x-webhook-timestamp"];
    const rawBody = req.rawBody;

    if (
      typeof signature !== "string" ||
      typeof timestamp !== "string" ||
      typeof rawBody !== "string"
    ) {
      return res.status(400).send("Missing webhook signature or raw body");
    }

    // Verify that the notification genuinely came from Cashfree.
    const event = cashfree.PGVerifyWebhookSignature(
      signature,
      rawBody,
      timestamp
    );

    const eventData = event.object?.data;
    const cashfreeOrderId = eventData?.order?.order_id;

    if (!cashfreeOrderId) {
      return res.status(200).send("Webhook received");
    }

    // Only process successful payment notifications.
    if (event.type !== "PAYMENT_SUCCESS_WEBHOOK") {
      return res.status(200).send("Event acknowledged");
    }

    const order = await Order.findOne({
      cashfreeOrderId,
      paymentMethod: "online",
    });

    if (!order) {
      return res.status(200).send("Order not found");
    }

    // Prevent duplicate processing.
    if (order.paymentStatus === "paid") {
      return res.status(200).send("Already processed");
    }

    // Confirm the actual order status directly with Cashfree.
    const response = await cashfree.PGFetchOrder(cashfreeOrderId);
    const payment = response.data;

    if (
      payment.order_status !== "PAID" ||
      payment.order_currency !== "INR" ||
      Number(payment.order_amount) !== Number(order.totalAmount)
    ) {
      return res.status(400).send("Payment verification failed");
    }

    order.paymentStatus = "paid";
    order.status = "confirmed";

    if (eventData.payment?.cf_payment_id) {
      order.cashfreePaymentId = String(
        eventData.payment.cf_payment_id
      );
    }

    await order.save();

    console.log("Cashfree payment confirmed:", cashfreeOrderId);

    return res.status(200).send("Payment confirmed");
  } catch (error) {
    console.error("Cashfree webhook error:", error);
    return res.status(400).send("Webhook verification failed");
  }
};