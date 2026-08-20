import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
import {
     protect,
     adminOnly,
    } from "../middleware/authMiddleware.js";

const router = Router();

// Create a new order
router.post("/", protect, createOrder);

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