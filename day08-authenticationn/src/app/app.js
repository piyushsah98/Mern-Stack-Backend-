import express from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { authenticate } from "../middlewares/auth.middleware.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.create({
      name,
      email,
      hashPassword: await bcrypt.hash(password, 10), // ye bhi promise return karta hai
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
    );

    res.status(201).json({
      success: true,
      message: "user registered successfully",
      user: {
        name,
        email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error ${error}`,
    });
  }
});

app.get("/api/auth/me", authenticate, async (req, res) => {
  console.log(req.user);

  res.status(200).json({
    data: {
      user: req.user,
    },
  });
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "email or password is incorrect" });
    }

    const isPasswordMactched = await bcrypt.compare(password, user.hashPassword);

    if (!isPasswordMactched) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
    );

    res.status(200).json({
      message: "Login successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default app;
