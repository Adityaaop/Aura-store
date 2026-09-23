import "./polyfill.cjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import categories from "./data/categories.js";
import getProducts from "./data/products.js";
import User from "./models/userModel.js";
import Category from "./models/categoryModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdCategories = await Category.insertMany(categories);

    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    const sampleProducts = getProducts(categoryMap);
    await Product.insertMany(sampleProducts);

    console.log("✨ AURA Store Data Successfully Imported!");
    console.log(`👤 Admin Account: admin@aura.store / admin123456`);
    console.log(`👤 Demo Customer: customer@aura.store / customer123456`);
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    console.log("🗑️  Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
