const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://piyushsah989_db_user:Piyushsloshu2406@cohort-cluster.6wwpm94.mongodb.net/",
    );
    console.log("mongoDb connected");
  } catch (error) {
    console.log("error while connecting mongodb ", error);
  }
};

module.exports = connectDb;
