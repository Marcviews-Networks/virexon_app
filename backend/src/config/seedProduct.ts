import dns from "dns"
dns.setServers(["8.8.8.8", "1.1.1.1"])
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
        images: [
            "/Products/bluetooth-shutter-remote/1.png",
            "/Products/bluetooth-shutter-remote/2.png",
            "/Products/bluetooth-shutter-remote/3.png",
            "/Products/bluetooth-shutter-remote/4.png",
            "/Products/bluetooth-shutter-remote/6.png",
            "/Products/bluetooth-shutter-remote/7.png",
            "/Products/bluetooth-shutter-remote/8.png",
            "/Products/bluetooth-shutter-remote/5.png",
        ],
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
        images: [
            "/Products/electric-lighter/1.jpeg",
            "/Products/electric-lighter/2.jpeg",
            "/Products/electric-lighter/3.jpeg",
            "/Products/electric-lighter/4.jpeg",
            "/Products/electric-lighter/6.jpeg",
            "/Products/electric-lighter/7.jpeg",
            "/Products/electric-lighter/8.jpeg",
            "/Products/electric-lighter/9.jpeg",
            "/Products/electric-lighter/5.jpeg",
        ],
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
        images: [
            "/Products/garbage-bag/1.png",
            "/Products/garbage-bag/2.png",
            "/Products/garbage-bag/3.png",
            "/Products/garbage-bag/4.png",
            "/Products/garbage-bag/5.png",
            "/Products/garbage-bag/6.png",
            "/Products/garbage-bag/8.png",
            "/Products/garbage-bag/7.png",
        ],
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
        images: [
            "/Products/one-wish-willow/1.png",
            "/Products/one-wish-willow/2.1.jpg",
            "/Products/one-wish-willow/2.jpeg",
            "/Products/one-wish-willow/4:1.jpg",
            "/Products/one-wish-willow/4.jpeg",
            "/Products/one-wish-willow/5.jpeg",
            "/Products/one-wish-willow/6.jpeg",
            "/Products/one-wish-willow/7.jpeg",
            "/Products/one-wish-willow/3.1.jpg",
        ],
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
        images: [
            "/Products/oval-mirror/1.png",
            "/Products/oval-mirror/2.png",
            "/Products/oval-mirror/5.png",
            "/Products/oval-mirror/3.png",
            "/Products/oval-mirror/4.png",
            "/Products/oval-mirror/6.png",
            "/Products/oval-mirror/7.png",
            "/Products/oval-mirror/9.png",
            "/Products/oval-mirror/8.png",
            "/Products/oval-mirror/10.png",
        ],
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
        images: [
            "/Products/pvc-bag/1.png",
            "/Products/pvc-bag/2.png",
            "/Products/pvc-bag/3.png",
            "/Products/pvc-bag/4.png",
            "/Products/pvc-bag/5.png",
            "/Products/pvc-bag/6.png",
            "/Products/pvc-bag/8.jpg",
            "/Products/pvc-bag/9.jpg",
        ],
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
        images: [
            "/Products/self-defence-rod/1.png",
            "/Products/self-defence-rod/2.png",
            "/Products/self-defence-rod/4.png",
            "/Products/self-defence-rod/5.png",
            "/Products/self-defence-rod/6.png",
            "/Products/self-defence-rod/7.png",
            "/Products/self-defence-rod/8.png",
            "/Products/self-defence-rod/11.png",
            "/Products/self-defence-rod/3.png",
        ],
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
        variants: [
            {
                name: "Silver",
                images: [
                    "/Products/snap-button-kit/silver/1.jpeg",
                    "/Products/snap-button-kit/silver/2.jpeg",
                    "/Products/snap-button-kit/silver/3.jpeg",
                    "/Products/snap-button-kit/silver/4.jpeg",
                    "/Products/snap-button-kit/silver/5.jpeg",
                    "/Products/snap-button-kit/silver/6.jpeg",
                    "/Products/snap-button-kit/silver/7.jpeg",
                    "/Products/snap-button-kit/silver/8.jpeg",
                ],
            },

            {
                name: "Multicolour",
                images: [
                    "/Products/snap-button-kit/multicolour/9.jpeg",
                    "/Products/snap-button-kit/multicolour/10.jpeg",
                    "/Products/snap-button-kit/multicolour/11.jpeg",
                    "/Products/snap-button-kit/multicolour/12.jpeg",
                    "/Products/snap-button-kit/multicolour/13.jpeg",
                    "/Products/snap-button-kit/multicolour/14.jpeg",
                ],
            },
        ],
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
        images: [
            "/Products/velvet-bag/1.jpeg",
            "/Products/velvet-bag/2.jpeg",
            "/Products/velvet-bag/3.jpeg",
            "/Products/velvet-bag/4.jpeg",
            "/Products/velvet-bag/5.jpeg",
            "/Products/velvet-bag/6.jpeg",
            "/Products/velvet-bag/7.jpeg",
            "/Products/velvet-bag/8.jpeg",

        ],
        variants: [],
        isFeatured: false,
    },
    {
        name: "Electric Nail Clipper",
        slug: "electric-nail-clipper",
        brand: "Virexon",
        category: "Main Products",
        subCategory: "Personal Care",
        price: 199,
        stock: 40,
        description:
            "Electric nail clipper and grinder designed for convenient nail care.",
        specs: {
            function: "Cutting and grinding",
            grinding: "360° rotary grinding",
            storage: "Back storage",
            noise: "Low noise",
            shockAbsorption: "Yes",
        },
        images: [
            "/Products/electric-nail-clipper/1.jpeg",
            "/Products/electric-nail-clipper/2.jpeg",
            "/Products/electric-nail-clipper/3.jpeg",
            "/Products/electric-nail-clipper/4.jpeg",
            "/Products/electric-nail-clipper/5.jpeg",
        ],
        variants: [],
        isFeatured: true,
    },
    {
    name: "Fungal Nail Patches",
    slug: "fungal-nail-patches",
    brand: "Virexon",
    category: "Main Products",
    subCategory: "Personal Care",
    price: 299,
    stock: 40,
    description:
        "Fungal nail patches designed for overnight nail care with hydrogel patches.",
    specs: {
        patchSize: "4.2 cm × 7.5 cm",
        care: "Overnight nail care",
        material: "Hydrogel",
        quantity: "21 PCS",
    },
    images: [
        "/Products/fungal-nail-patches/1.jpeg",
        "/Products/fungal-nail-patches/2.jpeg",
        "/Products/fungal-nail-patches/3.jpeg",
        "/Products/fungal-nail-patches/4.jpeg",
        "/Products/fungal-nail-patches/5.jpeg",
        "/Products/fungal-nail-patches/6.jpeg",
    ],
    variants: [],
    isFeatured: true,
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
        images: [
            "/Products/crystal-candle/1.png",
            "/Products/crystal-candle/2.png",
            "/Products/crystal-candle/3.png",
            "/Products/crystal-candle/4.png",
            "/Products/crystal-candle/5.png",
            "/Products/crystal-candle/6.png",
        ],
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
        images: [
            "/Products/led-diyas/1.png",
            "/Products/led-diyas/2.png",
            "/Products/led-diyas/5.png",
            "/Products/led-diyas/3.png",
            "/Products/led-diyas/4.png",
            "/Products/led-diyas/7.png",
            "/Products/led-diyas/8.png",
            "/Products/led-diyas/9.png",
            "/Products/led-diyas/10.png",
        ],
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
        images: [
            "/Products/multicolour-led-light/4.png",
            "/Products/multicolour-led-light/3.png",
            "/Products/multicolour-led-light/1.png",
            "/Products/multicolour-led-light/2.png",
            "/Products/multicolour-led-light/5.png",
            "/Products/multicolour-led-light/6.png",
            "/Products/multicolour-led-light/7.png",
            "/Products/multicolour-led-light/8.png",
        ],
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
        images: [
            "/Products/white-led-candles/4.png",
            "/Products/white-led-candles/1.png",
            "/Products/white-led-candles/2.png",
            "/Products/white-led-candles/3.png",
            "/Products/white-led-candles/5.png",
            "/Products/white-led-candles/6.png",
            "/Products/white-led-candles/8.png",
            "/Products/white-led-candles/7.png",
        ],
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
        images: [
            "/Products/big-crystal-yellow/1.png",
            "/Products/big-crystal-yellow/2.png",
            "/Products/big-crystal-yellow/3.png",
            "/Products/big-crystal-yellow/4.png",
            "/Products/big-crystal-yellow/5.png",
            "/Products/big-crystal-yellow/6.jpeg",
            "/Products/big-crystal-yellow/7.jpg",
            "/Products/big-crystal-yellow/8.jpg",
        ],
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
        images: [
            "/Products/crystall-ball/1.png",
            "/Products/crystall-ball/2.png",
            "/Products/crystall-ball/3.png",
            "/Products/crystall-ball/4.png",
            "/Products/crystall-ball/5.png",
            "/Products/crystall-ball/6.png",
            "/Products/crystall-ball/7.png",
            "/Products/crystall-ball/8.png",
            "/Products/crystall-ball/9.png",
        ],
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
        images: [
            "/Products/drop-light/1.png",
            "/Products/drop-light/2.png",
            "/Products/drop-light/3.png",
            "/Products/drop-light/4.png",
            "/Products/drop-light/5.png",
            "/Products/drop-light/6.png",
            "/Products/drop-light/7.png",
            "/Products/drop-light/8.png",
            "/Products/drop-light/9.png",
        ],
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
        images: [
            "/Products/flower/1.png",
            "/Products/flower/2.png",
            "/Products/flower/3.png",
            "/Products/flower/4.png",
            "/Products/flower/5.png",
            "/Products/flower/6.png",
            "/Products/flower/7.png",
        ],
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
        images: [
            "/Products/snow-flakes/1.png",
            "/Products/snow-flakes/2.png",
            "/Products/snow-flakes/3.png",
            "/Products/snow-flakes/4.png",
            "/Products/snow-flakes/5.png",
            "/Products/snow-flakes/6.png",
            "/Products/snow-flakes/7.png",
        ],
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
        images: [
            "/Products/blue-ladi/1.png",
            "/Products/blue-ladi/2.png",
            "/Products/blue-ladi/3.png",
            "/Products/blue-ladi/4.jpg",
            "/Products/blue-ladi/5.jpg",
            "/Products/blue-ladi/6.png",
            "/Products/blue-ladi/7.png",
            "/Products/blue-ladi/8.png",
        ],
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
        images: [
            "/Products/green-ladi/1.jpg",
            "/Products/green-ladi/2.jpg",
            "/Products/green-ladi/3.png",
            "/Products/green-ladi/4.png",
            "/Products/green-ladi/5.png",
            "/Products/green-ladi/6.png",
            "/Products/green-ladi/7.png",
        ],
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
        images: [
            "/Products/red-ladi/1.png",
            "/Products/red-ladi/2.jpg",
            "/Products/red-ladi/3.png",
            "/Products/red-ladi/4.png",
            "/Products/red-ladi/5.png",
            "/Products/red-ladi/6.jpg",
            "/Products/red-ladi/7.jpg",
        ],
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
        images: [
            "/Products/white-ladi/1.png",
            "/Products/white-ladi/2.png",
            "/Products/white-ladi/3.png",
            "/Products/white-ladi/4.png",
            "/Products/white-ladi/5.png",
            "/Products/white-ladi/6.jpg",
            "/Products/white-ladi/7.jpg",
            "/Products/white-ladi/8.jpg",
        ],
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
        images: [
            "/Products/yellow-ladi/1.png",
            "/Products/yellow-ladi/2.png",
            "/Products/yellow-ladi/3.png",
            "/Products/yellow-ladi/4.png",
            "/Products/yellow-ladi/5.jpg",
            "/Products/yellow-ladi/6.jpg",
            "/Products/yellow-ladi/7.jpg",
        ],
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
        variants: [
            {
                name: "Black",
                images: [
                    "/Products/folding-desktop-stand/Black/1.png",
                    "/Products/folding-desktop-stand/Black/2.png",
                    "/Products/folding-desktop-stand/Black/3.png",
                    "/Products/folding-desktop-stand/Black/4.png",
                    "/Products/folding-desktop-stand/Black/5.png",
                    "/Products/folding-desktop-stand/Black/6.png",
                    "/Products/folding-desktop-stand/Black/7.png",
                    "/Products/folding-desktop-stand/Black/8.png",
                    "/Products/folding-desktop-stand/Black/9.png",
                ],
            },
            {
                name: "White",
                images: [
                    "/Products/folding-desktop-stand/White/11.png",
                    "/Products/folding-desktop-stand/White/12.png",
                    "/Products/folding-desktop-stand/White/13.png",
                    "/Products/folding-desktop-stand/White/14.png",
                    "/Products/folding-desktop-stand/White/15.png",
                    "/Products/folding-desktop-stand/White/16.png",
                ],
            },
        ],
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
        images: [
            "/Products/folding-lifting-bracket/1.png",
            "/Products/folding-lifting-bracket/2.png",
            "/Products/folding-lifting-bracket/3.png",
            "/Products/folding-lifting-bracket/4.png",
            "/Products/folding-lifting-bracket/5.png",
            "/Products/folding-lifting-bracket/6.png",
            "/Products/folding-lifting-bracket/7.png",
        ],
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
        images: [
            "/Products/live-stand/1.png",
            "/Products/live-stand/2.png",
            "/Products/live-stand/3.png",
            "/Products/live-stand/4.png",
            "/Products/live-stand/5.png",
            "/Products/live-stand/6.png",
            "/Products/live-stand/7.png",
        ],
        variants: [],
        isFeatured: false,
    },

    {
        name: "Fish Gorilla",
        slug: "fish-gorilla",
        brand: "Vernox",
        category: "Tripods",
        subCategory: "Tripod",
        price: 99,
        stock: 50,
        description: "Flexible Gorilla tripod designed for stable and versatile camera positioning.",
        specs: {
            type: "Tripod",
        },
        images: [
            "/Products/fish-gorilla/1.png",
            "/Products/fish-gorilla/2.png",
            "/Products/fish-gorilla/3.png",
            "/Products/fish-gorilla/4.png",
            "/Products/fish-gorilla/5.png",
            "/Products/fish-gorilla/6.png",
            "/Products/fish-gorilla/7.png",
        ],
        variants: [],
        isFeatured: false,
    },

    {
        name: "Gorilla Tripod Set",
        slug: "gorilla-tripod-set",
        brand: "Vernox",
        category: "Tripods",
        subCategory: "Tripod",
        price: 149,
        stock: 90,
        description: "Versatile Gorilla tripod set designed for stable and flexible camera positioning.",
        specs: {
            type: "Tripod Set",
        },
        images: [
            "/Products/gorilla-tripod/1.png",
            "/Products/gorilla-tripod/2.png",
            "/Products/gorilla-tripod/3.png",
            "/Products/gorilla-tripod/4.png",
            "/Products/gorilla-tripod/5.png",
            "/Products/gorilla-tripod/6.png",
            "/Products/gorilla-tripod/7.png",
            "/Products/gorilla-tripod/8.png",
            "/Products/gorilla-tripod/9.png",
            "/Products/gorilla-tripod/10.png",
        ],
        variants: [],
        isFeatured: false,
    },

    {
        name: "Ball Head",
        slug: "ball-head",
        brand: "Vernox",
        category: "Tripods",
        subCategory: "Ball Head",
        price: 99,
        stock: 60,
        description: "Adjustable ball head designed for smooth and flexible camera positioning.",
        specs: {
            type: "Ball Head",
        },
        images: [
            "/Products/ball-head/1.png",
            "/Products/ball-head/2.png",
            "/Products/ball-head/3.png",
            "/Products/ball-head/4.png",
            "/Products/ball-head/5.png",
            "/Products/ball-head/6.png",
            "/Products/ball-head/7.png",
        ],
        variants: [],
        isFeatured: false,
    },

    {
        name: "Clip A",
        slug: "clip-a",
        brand: "Vernox",
        category: "Tripods",
        subCategory: "Clips",
        price: 99,
        stock: 75,
        description: "Versatile clip designed for secure and stable mounting with tripod accessories.",
        specs: {
            type: "Tripod Clip",
        },
        images: [
            "/Products/clip-a/1.png",
            "/Products/clip-a/2.png",
            "/Products/clip-a/3.png",
            "/Products/clip-a/4.png",
            "/Products/clip-a/5.png",
            "/Products/clip-a/6.png",
            "/Products/clip-a/7.png",
            "/Products/clip-a/8.png",
            "/Products/clip-a/9.png",
        ],
        variants: [],
        isFeatured: false,
    },

    {
        name: "Clip B",
        slug: "clip-b",
        brand: "Vernox",
        category: "Tripods",
        subCategory: "Clips",
        price: 149,
        stock: 45,
        description: "Reliable mounting clip designed for flexible tripod and camera accessory setups.",
        specs: {
            type: "Tripod Clip",
        },
        images: [
            "/Products/clip-b/1.png",
            "/Products/clip-b/2.png",
            "/Products/clip-b/3.png",
            "/Products/clip-b/4.png",
            "/Products/clip-b/5.png",
            "/Products/clip-b/6.png",
            "/Products/clip-b/7.png",
            "/Products/clip-b/8.png",
        ],
        variants: [],
        isFeatured: false,
    },

    {
        name: "Clip C",
        slug: "clip-c",
        brand: "Vernox",
        category: "Tripods",
        subCategory: "Clips",
        price: 249,
        stock: 75,
        description: "Compact tripod clip designed for secure and convenient accessory mounting.",
        specs: {
            type: "Tripod Clip",
        },
        images: [
            "/Products/clip-c/1.png",
            "/Products/clip-c/2.png",
            "/Products/clip-c/3.png",
            "/Products/clip-c/4.png",
            "/Products/clip-c/5.png",
            "/Products/clip-c/6.png",
            "/Products/clip-c/7.png",
        ],
        variants: [],
        isFeatured: false,
    },

    {
        name: "Mount Adapter + Holder Clip A",
        slug: "mount-adapter-holder-clip-a",
        brand: "Vernox",
        category: "Tripods",
        subCategory: "Mount Adapters",
        price: 149,
        stock: 50,
        description: "Mount adapter with holder clip designed for secure and flexible tripod accessory mounting.",
        specs: {
            type: "Mount Adapter + Holder Clip",
        },
        images: [
            "/Products/mahc-a/1.png",
            "/Products/mahc-a/2.png",
            "/Products/mahc-a/3.png",
            "/Products/mahc-a/4.png",
            "/Products/mahc-a/5.png",
            "/Products/mahc-a/6.png",
            "/Products/mahc-a/7.png",
        ],
        variants: [],
        isFeatured: false,
    },

    {
        name: "Mount Adapter + Holder Clip B",
        slug: "mount-adapter-holder-clip-b",
        brand: "Vernox",
        category: "Tripods",
        subCategory: "Mount Adapters",
        price: 199,
        stock: 60,
        description: "Versatile mount adapter with holder clip for stable tripod and camera accessory setups.",
        specs: {
            type: "Mount Adapter + Holder Clip",
        },
        images: [
            "/Products/mahc-b/1.png",
            "/Products/mahc-b/2.png",
            "/Products/mahc-b/3.png",
            "/Products/mahc-b/4.png",
            "/Products/mahc-b/5.png",
            "/Products/mahc-b/6.png",
            "/Products/mahc-b/7.png",
            "/Products/mahc-b/8.png",
        ],
        variants: [],
        isFeatured: false,
    },

    {
        name: "Mount Adapter + Holder Clip C",
        slug: "mount-adapter-holder-clip-c",
        brand: "Vernox",
        category: "Tripods",
        subCategory: "Mount Adapters",
        price: 199,
        stock: 75,
        description: "Secure mount adapter with holder clip designed for convenient tripod accessory attachment.",
        specs: {
            type: "Mount Adapter + Holder Clip",
        },
        images: [
            "/Products/mahc-c/1.png",
            "/Products/mahc-c/2.png",
            "/Products/mahc-c/3.png",
            "/Products/mahc-c/4.png",
            "/Products/mahc-c/5.png",
            "/Products/mahc-c/6.png",
            "/Products/mahc-c/7.png",
            "/Products/mahc-c/8.png",
        ],
        variants: [],
        isFeatured: false,
    },

    {
        name: "Tripod Legs",
        slug: "tripod-legs",
        brand: "Vernox",
        category: "Tripods",
        subCategory: "Tripod Legs",
        price: 175,
        stock: 100,
        description: "Durable tripod legs designed to provide stable and reliable support for camera and tripod setups.",
        specs: {
            type: "Tripod Legs",
        },
        images: [
            "/Products/tripod-legs/1.png",
            "/Products/tripod-legs/2.png",
            "/Products/tripod-legs/3.png",
            "/Products/tripod-legs/4.png",
            "/Products/tripod-legs/5.png",
            "/Products/tripod-legs/6.png",
            "/Products/tripod-legs/7.png",
        ],
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