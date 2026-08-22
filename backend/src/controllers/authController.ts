import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { AuthRequest } from "../middleware/authMiddleware.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "fallback_secret";

// Helper function to issue JWT cookie
const sendTokenResponse = (
  user: { _id: unknown; role: string },
  statusCode: number,
  res: Response
) => {
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(statusCode).json({
    success: true,
    user: {
      id: user._id,
      role: user.role,
    },
  });
};

// POST /api/auth/register
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ success: false, message: "Email already registered" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    passwordHash,
    role: "client", // Force default client role on public register
  });

  sendTokenResponse(user, 201, res);
};

// POST /api/auth/login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: "Provide email and password" });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
    return;
  }

  sendTokenResponse(user, 200, res);
};

// POST /api/auth/logout
export const logout = async (_req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// GET /api/auth/me
export const getMe = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?.id).select("-passwordHash");
  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }

  res.status(200).json({ success: true, data: user });
};


export const getAddresses = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json(user.addresses || []);
  } catch (error) {
    console.error("Error fetching addresses:", error);

    res.status(500).json({
      message: "Failed to fetch addresses",
    });
  }
};

// ----------------------------------------------------
// 1. ADD NEW ADDRESS
// ----------------------------------------------------
export const addAddress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { street, city, state, zipCode, country, isDefault } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    // Unset previous defaults if this new address is default
    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    const isFirstAddress = user.addresses.length === 0;

    user.addresses.push({
      street,
      city,
      state,
      zipCode,
      country,
      isDefault: isDefault || isFirstAddress,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: user.addresses,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ----------------------------------------------------
// 2. UPDATE AN EXISTING ADDRESS
// ----------------------------------------------------
export const updateAddress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { addressId } = req.params;
    const { street, city, state, zipCode, country, isDefault } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    // Search for address subdocument in array
    const address = user.addresses.find((addr) => addr._id?.toString() === addressId);
    if (!address) {
      res.status(404).json({ success: false, message: "Address not found" });
      return;
    }

    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
      address.isDefault = true;
    }

    if (street) address.street = street;
    if (city) address.city = city;
    if (state) address.state = state;
    if (zipCode) address.zipCode = zipCode;
    if (country) address.country = country;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: user.addresses,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ----------------------------------------------------
// 3. DELETE AN ADDRESS
// ----------------------------------------------------
export const deleteAddress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { addressId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    // Filter out the deleted address using standard JS
    user.addresses = user.addresses.filter(
      (addr) => addr._id?.toString() !== addressId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: user.addresses,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};