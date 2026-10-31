import { Router } from "express";
import {
  createReview,
  getProductReviews,
  getPendingReviews,
  moderateReview,
} from "../controllers/reviewController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = Router();

// Public: submit a review (saved as pending)
router.post("/", createReview);

// Public: get approved reviews for a product
router.get("/product/:productId", getProductReviews);

// Admin only: list pending reviews
router.get("/admin/pending", protect, adminOnly, getPendingReviews);

// Admin only: approve or reject a review
router.patch("/admin/:reviewId", protect, adminOnly, moderateReview);

export default router;