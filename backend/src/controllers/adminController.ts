import { Request, Response } from "express";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";
import { Order } from "../models/orderModel.js";

// GET /api/admin/analytics - Overview metrics
export const getAdminAnalytics = async (_req: Request, res: Response) => {
  const [totalUsers, totalProducts, lowStockProducts] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Product.countDocuments({ stock: { $lt: 5 } }),
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalProducts,
      lowStockAlerts: lowStockProducts,
      totalRevenue: 128450.00, // Placeholder until Order schema is linked
    },
  });
};

// GET /api/admin/products - List products with search & pagination
export const getAdminProducts = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search ? String(req.query.search) : "";

  const query = search ? { name: { $regex: search, $options: "i" } } : {};

  const [products, total] = await Promise.all([
    Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Product.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: products,
    pagination: { total, page, pages: Math.ceil(total / limit) },
  });
};

// POST /api/admin/products - Add product
export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
};

// PUT /api/admin/products/:id - Update product
export const updateProduct = async (req: Request, res: Response) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }

  res.status(200).json({ success: true, data: updated });
};

// DELETE /api/admin/products/:id - Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);

  if (!deleted) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }

  res.status(200).json({ success: true, message: "Product deleted successfully" });
};

// GET /api/admin/orders - List all customer orders
export const getAdminOrders = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));

    const [orders, total] = await Promise.all([
      Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Order.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      orders,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Admin orders error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch orders",
    });
  }
};

// PUT /api/admin/orders/:id/status - Update order status
export const updateAdminOrderStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update order status",
    });
  }
};