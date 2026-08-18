// Global shared types for the frontend application

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface IVariant {
  name: string;
  images: string[];
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  category: "Main Products" | "Diwali" | "Phone Stands" | "Tripods";
  subCategory?: string;
  price: number;
  stock: number;
  description: string;
  specs: Record<string, string>;
  images: string[];
  variants?: IVariant[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}
