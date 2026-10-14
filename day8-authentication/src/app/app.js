import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to Authentication api",
  });
});

app.post("/api/auth/create", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    // Creating a token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
    );

    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error -> ${error}`,
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
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "email or password is incorrect",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({
      message: "email or password is incorrect",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.status(200).json({
    message: "user logged in successfully",
    data: {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    },
  });
});

export default app;
