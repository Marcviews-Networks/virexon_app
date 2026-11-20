import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

import {
  createCashfreePayment,
  verifyCashfreePayment,
} from "../controllers/cashfreeController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = Router();

// Create a new COD order
router.post("/", protect, createOrder);

// Create Cashfree payment
router.post("/cashfree/create", protect, createCashfreePayment);

// Verify Cashfree payment
router.post("/cashfree/verify", protect, verifyCashfreePayment);

// Get logged-in user's orders
router.get("/my", protect, getMyOrders);

// Get a specific order
router.get("/:id", protect, getOrderById);

// Update order status - Admin only
router.patch(
  "/:id/status",
  protect,
  adminOnly,
  updateOrderStatus
);

export default router;