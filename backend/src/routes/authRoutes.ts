import { Router } from "express";
import {
  register,
  login,
  logout,
  getMe,
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Public auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Protected user routes
router.get("/me", protect, getMe);

// Protected address management routes
router.get("/addresses", protect, getAddresses);
router.post("/addresses", protect, addAddress);
router.put("/addresses/:addressId", protect, updateAddress);
router.delete("/addresses/:addressId", protect, deleteAddress);

export default router;