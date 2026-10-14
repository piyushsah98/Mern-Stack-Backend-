import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    const data = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(data.id);

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: `Internal server error ${error.message}` });
  }
};
