import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "buyer",
        enum: ["buyer", "seller"], /// enum is used to restrict the values of the role field to either "buyer" or "seller"
    },
    refreshToken: {
        type: String
    }
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
