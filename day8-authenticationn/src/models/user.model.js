import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, "email address is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    unique: true,
  },
  hashPassword: {
    type: String,
    required: [true, "password is required"],
    minLength: 6,
  },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
