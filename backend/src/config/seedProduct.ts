import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/productModel.js";

dotenv.config();

const products = [
  // =========================
  // MAIN PRODUCTS
  // =========================

  {
    name: "Bluetooth Shutter Remote",
    slug: "bluetooth-shutter-remote",
    brand: "Vernox",
    category: "Main Products",
    subCategory: "Accessories",
    price: 499,
    stock: 50,
    description:
      "Wireless Bluetooth shutter remote for remotely capturing photos using compatible smartphones.",
    specs: {
      connectivity: "Bluetooth",
      range: "10 meters",
      compatibility: "Android and iOS",
    },
    images: [],
    variants: [],
    isFeatured: true,
  },

  {
    name: "Electric Lighter",
    slug: "electric-lighter",
    brand: "Vernox",
    category: "Main Products",
    subCategory: "General",
    price: 299,
    stock: 75,
    description:
      "Rechargeable electric lighter featuring convenient flameless ignition.",
    specs: {
      type: "Electric",
      rechargeable: "Yes",
      ignition: "Flameless",
    },
    images: [],
    variants: [],
    isFeatured: true,
  },

  {
    name: "Garbage Bag",
    slug: "garbage-bag",
    brand: "Vernox",
    category: "Main Products",
    subCategory: "Household",
    price: 199,
    stock: 100,
    description:
      "Durable garbage bags suitable for everyday household waste disposal.",
    specs: {
      material: "Plastic",
      usage: "Household",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  {
    name: "One Wish Willow",
    slug: "one-wish-willow",
    brand: "Vernox",
    category: "Main Products",
    subCategory: "General",
    price: 349,
    stock: 40,
    description:
      "One Wish Willow product designed for decorative and gifting purposes.",
    specs: {
      type: "Decorative",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  {
    name: "Oval Mirror",
    slug: "oval-mirror",
    brand: "Vernox",
    category: "Main Products",
    subCategory: "Home & Decor",
    price: 599,
    stock: 30,
    description:
      "Elegant oval-shaped mirror suitable for home and personal spaces.",
    specs: {
      shape: "Oval",
      usage: "Home Decor",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  {
    name: "PVC Hot Bag",
    slug: "pvc-hot-bag",
    brand: "Vernox",
    category: "Main Products",
    subCategory: "Hot Bags",
    price: 399,
    stock: 60,
    description:
      "Reusable PVC hot water bag designed for convenient heat therapy and warmth.",
    specs: {
      material: "PVC",
      reusable: "Yes",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  {
    name: "Self Defence Rod",
    slug: "self-defence-rod",
    brand: "Vernox",
    category: "Main Products",
    subCategory: "Self Defence",
    price: 699,
    stock: 25,
    description:
      "Compact personal safety product designed for emergency situations.",
    specs: {
      type: "Self Defence",
      material: "Metal",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  {
    name: "Snap Button Kit",
    slug: "snap-button-kit",
    brand: "Vernox",
    category: "Main Products",
    subCategory: "Accessories",
    price: 249,
    stock: 80,
    description:
      "Convenient snap button kit for clothing, craft and repair applications.",
    specs: {
      type: "Snap Buttons",
      usage: "Craft and Repair",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  {
    name: "Velvet Hot Bag",
    slug: "velvet-hot-bag",
    brand: "Vernox",
    category: "Main Products",
    subCategory: "Hot Bags",
    price: 449,
    stock: 45,
    description:
      "Soft velvet hot bag designed to provide comfortable warmth.",
    specs: {
      material: "Velvet",
      reusable: "Yes",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  // =========================
  // DIWALI - CANDLE AND DIYAS
  // =========================

  {
    name: "Crystal Candle",
    slug: "crystal-candle",
    brand: "Vernox",
    category: "Diwali",
    subCategory: "Candle and Diyas",
    price: 149,
    stock: 100,
    description:
      "Decorative crystal candle suitable for Diwali celebrations and festive decoration.",
    specs: {
      type: "Candle",
      usage: "Diwali Decoration",
    },
    images: [],
    variants: [],
    isFeatured: true,
  },

  {
    name: "LED Diyas",
    slug: "led-diyas",
    brand: "Vernox",
    category: "Diwali",
    subCategory: "Candle and Diyas",
    price: 199,
    stock: 100,
    description:
      "Decorative LED diyas designed to add a festive glow to homes and celebrations.",
    specs: {
      type: "LED Diya",
      power: "Battery",
    },
    images: [],
    variants: [],
    isFeatured: true,
  },

  {
    name: "Multicolor LED Candles",
    slug: "multicolor-led-candles",
    brand: "Vernox",
    category: "Diwali",
    subCategory: "Candle and Diyas",
    price: 249,
    stock: 80,
    description:
      "Colorful LED candles designed for festive and decorative lighting.",
    specs: {
      type: "LED Candle",
      color: "Multicolor",
    },
    images: [],
    variants: [],
    isFeatured: true,
  },

  {
    name: "White LED Candles",
    slug: "white-led-candles",
    brand: "Vernox",
    category: "Diwali",
    subCategory: "Candle and Diyas",
    price: 199,
    stock: 80,
    description:
      "White LED candles suitable for Diwali decorations and indoor festive lighting.",
    specs: {
      type: "LED Candle",
      color: "White",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  // =========================
  // DIWALI - CRYSTAL AND SILICON LIGHTS
  // =========================

  {
    name: "Big Crystal Yellow",
    slug: "big-crystal-yellow",
    brand: "Vernox",
    category: "Diwali",
    subCategory: "Crystal and Silicon Lights",
    price: 399,
    stock: 50,
    description:
      "Decorative big crystal yellow light for festive home decoration.",
    specs: {
      type: "Crystal Light",
      color: "Yellow",
    },
    images: [],
    variants: [],
    isFeatured: true,
  },

  {
    name: "Crystal Ball Multicolour",
    slug: "crystal-ball-multicolour",
    brand: "Vernox",
    category: "Diwali",
    subCategory: "Crystal and Silicon Lights",
    price: 449,
    stock: 45,
    description:
      "Multicolour crystal ball light designed for attractive festive decoration.",
    specs: {
      type: "Crystal Ball",
      color: "Multicolour",
    },
    images: [],
    variants: [],
    isFeatured: true,
  },

  {
    name: "Drop Light",
    slug: "drop-light",
    brand: "Vernox",
    category: "Diwali",
    subCategory: "Crystal and Silicon Lights",
    price: 299,
    stock: 60,
    description:
      "Decorative drop light suitable for festive and home decoration.",
    specs: {
      type: "Drop Light",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  {
    name: "Flower",
    slug: "flower-light",
    brand: "Vernox",
    category: "Diwali",
    subCategory: "Crystal and Silicon Lights",
    price: 299,
    stock: 60,
    description:
      "Flower-shaped decorative light designed for festive occasions.",
    specs: {
      type: "Flower Light",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  {
    name: "SnowFlakes",
    slug: "snowflakes",
    brand: "Vernox",
    category: "Diwali",
    subCategory: "Crystal and Silicon Lights",
    price: 349,
    stock: 50,
    description:
      "Snowflake-shaped decorative lights for festive and decorative displays.",
    specs: {
      type: "Snowflake Light",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  // =========================
  // DIWALI - RICE LIGHTS
  // =========================

  {
    name: "Blue-Ladi",
    slug: "blue-ladi",
    brand: "Vernox",
    category: "Diwali",
    subCategory: "Rice Lights",
    price: 249,
    stock: 100,
    description:
      "Blue decorative rice lights suitable for festive home decoration.",
    specs: {
      type: "Rice Light",
      color: "Blue",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  {
    name: "Green-Ladi",
    slug: "green-ladi",
    brand: "Vernox",
    category: "Diwali",
    subCategory: "Rice Lights",
    price: 249,
    stock: 100,
    description:
      "Green decorative rice lights suitable for festive home decoration.",
    specs: {
      type: "Rice Light",
      color: "Green",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  {
    name: "Red-Ladi",
    slug: "red-ladi",
    brand: "Vernox",
    category: "Diwali",
    subCategory: "Rice Lights",
    price: 249,
    stock: 100,
    description:
      "Red decorative rice lights suitable for festive home decoration.",
    specs: {
      type: "Rice Light",
      color: "Red",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  {
    name: "White-Ladi",
    slug: "white-ladi",
    brand: "Vernox",
    category: "Diwali",
    subCategory: "Rice Lights",
    price: 249,
    stock: 100,
    description:
      "White decorative rice lights suitable for festive home decoration.",
    specs: {
      type: "Rice Light",
      color: "White",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  {
    name: "Yellow-Ladi",
    slug: "yellow-ladi",
    brand: "Vernox",
    category: "Diwali",
    subCategory: "Rice Lights",
    price: 249,
    stock: 100,
    description:
      "Yellow decorative rice lights suitable for festive home decoration.",
    specs: {
      type: "Rice Light",
      color: "Yellow",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  // =========================
  // PHONE STANDS
  // =========================

  {
    name: "Folding Desktop Stand",
    slug: "folding-desktop-stand",
    brand: "Vernox",
    category: "Phone Stands",
    subCategory: "Folding Desktop Stand",
    price: 299,
    stock: 70,
    description:
      "Foldable desktop phone stand suitable for convenient hands-free viewing.",
    specs: {
      type: "Desktop Stand",
      foldable: "Yes",
    },
    images: [],
    variants: ["Black", "White"],
    isFeatured: true,
  },

  {
    name: "Folding Lifting Bracket",
    slug: "folding-lifting-bracket",
    brand: "Vernox",
    category: "Phone Stands",
    subCategory: "Folding Brackets",
    price: 349,
    stock: 60,
    description:
      "Adjustable folding lifting bracket designed to provide flexible phone positioning.",
    specs: {
      type: "Phone Bracket",
      foldable: "Yes",
      adjustable: "Yes",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },

  {
    name: "Live Stand",
    slug: "live-stand",
    brand: "Vernox",
    category: "Phone Stands",
    subCategory: "Live Stand",
    price: 399,
    stock: 50,
    description:
      "Phone live stand designed for stable positioning during live streaming and video calls.",
    specs: {
      type: "Phone Stand",
      usage: "Live Streaming",
    },
    images: [],
    variants: [],
    isFeatured: false,
  },
];

const seedProducts = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected");

    for (const product of products) {
      await Product.findOneAndUpdate(
        { slug: product.slug },
        product,
        {
          upsert: true,
          new: true,
          runValidators: true,
        }
      );
    }

    console.log(`${products.length} products seeded successfully`);

    await mongoose.disconnect();

    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();