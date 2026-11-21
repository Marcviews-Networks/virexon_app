import { Router } from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getAdminAnalytics,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminOrders,
  updateAdminOrderStatus,
} from "../controllers/adminController.js";

const router = Router();

router.use(protect, adminOnly);

router.get("/analytics", getAdminAnalytics);

router.get("/products", getAdminProducts);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// Order management
router.get("/orders", getAdminOrders);
router.put("/orders/:id/status", updateAdminOrderStatus);

export default router;