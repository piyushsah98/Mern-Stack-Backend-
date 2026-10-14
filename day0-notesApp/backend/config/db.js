require('dotenv').config();
const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("db is connected");
  } catch (error) {
    console.log("db connection failed", error);
  }
};

module.exports = dbConnect;
