import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./db.js";
import { User } from "../models/userModel.js";

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL ?? "admin@virexon.com";
    const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin@123456";

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin account already exists.");
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    await User.create({
      name: "Super Admin",
      email: adminEmail,
      passwordHash,
      role: "admin",
    });

    console.log(`Admin account created successfully!`);
    console.log(`Email: ${adminEmail}`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed admin:", error);
    process.exit(1);
  }
};

seedAdmin();