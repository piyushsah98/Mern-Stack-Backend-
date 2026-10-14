import express from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.js";

const router = express.Router();

/**
 * @POST /api/auth/register
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const UserAlreadyExists = await userModel.findOne({ email });

    if (UserAlreadyExists) {
      return res.status(400).json({
        message: "User already exists",
        errors: [
          {
            path: "email",
            message: "user already exists",
          },
        ],
      });
    }

    const user = await userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
    });

    const { accessToken, refreshToken } = generateTokens({ userId: user._id });

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    return res.status(201).json({
      message: "User registered successfully",
      data: {
        user: {
          name,
          email,
        },
      },
      accessToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error ${error.message}` });
  }
});

/**
 * @GET /api/auth/me
 */
router.get("/me", async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized, access token not found",
    });
  }

  try {
    const decoded = verifyAccessToken({ accessToken });

    const user = await userModel.findById(decoded.id);

    res.status(200).json({
      message: "User fetched successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorised, invalid or expired access token",
    });
  }
});

/**
 * @POST /api/auth/refresh
 */
router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorised, refresh token not found",
    });
  }

  try {
    const decoded = await verifyRefreshToken({ refreshToken });

    const user = await userModel.findById(decoded.id);

    if (user.refreshToken != refreshToken) {
      user.refreshToken = null;
      await user.save();

      return res.status(401).json({
        message: "Unauthorised, refresh token mismatched",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      userId: user._id,
    });

    user.refreshToken = newRefreshToken;
    user.save();

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    res.status(200).json({
      message: "Token refresh successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unauthorised, Invalid or expired access token",
    });
  }
});

export default router;
