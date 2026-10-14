import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () => {
  if (!config.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Please add it to the .env file.");
  }

  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    throw error;
  }
};
