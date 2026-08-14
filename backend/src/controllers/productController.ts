import { Request, Response } from "express";
import { Product } from "../models/productModel.js";


// Generate URL slug from title string
const createSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// @desc    Get all products (Public)
// @route   GET /api/products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};

// @desc    Get single product by ID or Slug (Public)
// @route   GET /api/products/:id
// @desc    Get single product by ID or Slug (Public)
// @route   GET /api/products/:id
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const rawId = req.params.id;

    // Narrow down array to single string if needed
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    if (!id) {
      res.status(400).json({ success: false, message: "Invalid product identifier" });
      return;
    }

    // Safely test if string is a valid 24-character Hex MongoDB ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

    const product = isObjectId
      ? await Product.findById(id)
      : await Product.findOne({ slug: id });

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Create product (Admin Only)
// @route   POST /api/products
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, slug, brand, category, price, stock, description, specs, images, isFeatured } = req.body;

    const generatedSlug = slug ? createSlug(slug) : createSlug(name);

    const existingProduct = await Product.findOne({ slug: generatedSlug });
    if (existingProduct) {
      res.status(400).json({ success: false, message: "Product slug already exists" });
      return;
    }

    const product = await Product.create({
      name,
      slug: generatedSlug,
      brand,
      category,
      price,
      stock,
      description,
      specs: specs || {},
      images: images || [],
      isFeatured: isFeatured || false,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message || "Failed to create product" });
  }
};

// @desc    Update product (Admin Only)
// @route   PUT /api/products/:id
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (req.body.name && !req.body.slug) {
      req.body.slug = createSlug(req.body.name);
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message || "Failed to update product" });
  }
};

// @desc    Delete product (Admin Only)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete product" });
  }
};