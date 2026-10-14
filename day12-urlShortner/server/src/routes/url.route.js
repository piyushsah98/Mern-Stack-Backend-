import express from "express";
import generateCode from "../config/generateCode.js";
import urlModel from "../models/url.model.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { url } = req.body;

    if (url.trim() === "") {
      return res.status(400).json({
        error: "Please enter a URL",
      });
    }

    if (
      url.startsWith("https://") === false &&
      url.startsWith("http://") === false
    ) {
      return res.status(400).json({
        error: "Please enter a valid URL starting with http:// or https://",
      });
    }

    if (url.length > 2048) {
      return res.status(400).json({
        error: "URL length exceeds the maximum limit of 2048 characters",
      });
    }

    const code = generateCode();

    const newUrl = await urlModel.create({
      shortCode: code,
      originalUrl: url,
    });

    return res.status(201).json({
      message: "Url shortend successfully",
      data: {
        originalUrl: newUrl.originalUrl,
        shortCode: newUrl.shortCode,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
});

router.get("/", async (req, res) => {
  const urls = await urlModel.find();

  return res.status(200).json({
    message: "Urls fetched successfully",
    data: {
      urls,
    },
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const url = await urlModel.findById(id);

  if (!url) {
    return res.status(404).json({
      error: "Url not found",
    });
  }

  await urlModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "url deleted successfully",
  });
});

export default router;
