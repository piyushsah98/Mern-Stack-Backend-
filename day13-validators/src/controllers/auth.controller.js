import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  const { email, phone, password } = req.body;

  // aam zindagi
  //   let errors = [];

  //   if (!email) {
  //     errors.push({
  //       field: "email",
  //       message: "Email is required",
  //     });
  //   }

  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   if (email && !emailRegex.test(email)) {
  //     errors.push({
  //       field: "email",
  //       message: "Invalid Email address`",
  //     });
  //   }

  //   if (!phone) {
  //     errors.push({
  //       field: "phone",
  //       message: "Phone is required",
  //     });
  //   }

  //   const phoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
  //   if (phone && !phoneRegex.test(phone)) {
  //     errors.push({
  //       field: "phone",
  //       message: "Invalid Phone number",
  //     });
  //   }

  //   if (!password && !password.trim()) {
  //     errors.push({
  //       field: "password",
  //       message: "Password is required",
  //     });
  //   }

  //   if (errors.length > 0) {
  //     return res.status(400).json({
  //       message: "Internal Error",
  //       errors,
  //     });
  //   }

  const emailExist = await userModel.findOne({ email });
  const phoneExist = await userModel.findOne({ phone });

  if (emailExist || phoneExist) {
    return res.status(400).json({
      message: "User Already Exists",
    });
  }

  const user = await userModel.create({
    email,
    phone,
    password: await bcrypt.hash(password, 13),
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      email: user.email,
      phone: user.phone,
    },
  });
};
