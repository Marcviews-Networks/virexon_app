import { Router } from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getAdminAnalytics,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/adminController.js";

const router = Router();

// Apply auth protection globally to all admin routes
router.use(protect, adminOnly);

router.get("/analytics", getAdminAnalytics);
router.get("/products", getAdminProducts);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;