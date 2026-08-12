import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  brand: string;
  category: "DSLR" | "Mirrorless" | "Lenses" | "Action Cam" | "Accessories";
  price: number;
  stock: number;
  description: string;
  specs: Record<string, string>; // e.g., { sensor: "Full-Frame", resolution: "45MP" }
  images: string[];
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    brand: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["DSLR", "Mirrorless", "Lenses", "Action Cam", "Accessories"],
    },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, default: 0, min: 0 },
    description: { type: String, required: true },
    specs: { type: Map, of: String },
    images: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);