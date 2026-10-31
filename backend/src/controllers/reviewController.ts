import { Request, Response } from "express";
import mongoose from "mongoose";
import Review from "../models/reviewModel.js";
import { Product } from "../models/productModel.js";

// Submit a review (it remains pending until an admin approves it)
export const createReview = async (req: Request, res: Response) => {
    try {
        const { productId, name, rating, comment } = req.body;

        if (
            typeof productId !== "string" ||
            !mongoose.Types.ObjectId.isValid(productId) ||
            typeof name !== "string" ||
            typeof comment !== "string" ||
            !Number.isInteger(Number(rating)) ||
            Number(rating) < 1 ||
            Number(rating) > 5 ||
            name.trim().length === 0 ||
            name.trim().length > 80 ||
            comment.trim().length < 5 ||
            comment.trim().length > 1500
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid name, rating, and review.",
            });
        }

        const productExists = await Product.findById(productId);

        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        const review = await Review.create({
            product: productId,
            name: name.trim(),
            rating: Number(rating),
            comment: comment.trim(),
            status: "pending",
        });

        return res.status(201).json({
            success: true,
            message: "Review submitted and awaiting admin approval.",
            data: review,
        });
    } catch (error) {
        console.error("Create review error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to submit review right now.",
        });
    }
};

// Get only approved reviews for a product
export const getProductReviews = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        if (typeof productId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID.",
            });
        }

        const reviews = await Review.find({
            product: productId,
            status: "approved",
        }).sort({ createdAt: -1 });

        const averageRating =
            reviews.length > 0
                ? reviews.reduce((total, review) => total + review.rating, 0) /
                reviews.length
                : 0;

        return res.status(200).json({
            success: true,
            data: reviews,
            averageRating: Number(averageRating.toFixed(1)),
            totalReviews: reviews.length,
        });
    } catch (error) {
        console.error("Get product reviews error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to load reviews right now.",
        });
    }
};

// Admin: list pending reviews
export const getPendingReviews = async (_req: Request, res: Response) => {
    try {
        const reviews = await Review.find({ status: "pending" })
            .populate("product", "name")
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        console.error("Get pending reviews error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to load pending reviews.",
        });
    }
};

// Admin: approve or reject a review
export const moderateReview = async (req: Request, res: Response) => {
    try {
        const { reviewId } = req.params;
        const { status } = req.body;

        if (typeof reviewId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid review ID.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid review ID.",
            });
        }

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be approved or rejected.",
            });
        }

        const review = await Review.findByIdAndUpdate(
            reviewId,
            { status },
            { new: true, runValidators: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: `Review ${status}.`,
            data: review,
        });
    } catch (error) {
        console.error("Moderate review error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update review status.",
        });
    }
};