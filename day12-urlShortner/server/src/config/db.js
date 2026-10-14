import mongoose from "mongoose";
import config from "./config.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed ", error.message);
  }
};

export default connectToDB;
