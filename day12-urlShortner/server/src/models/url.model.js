import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    click: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const urlModel = mongoose.model("urls", urlSchema);
export default urlModel;
