import userModel from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken, matchRefreshToken } from "../utils/auth.utils.js";
import bcrypt from 'bcrypt'

export const registerController = async (req, res) => {
    const { name, email, password } = req.body;

    const isEmailALreadyExists = await userModel.findOne({ email });

    if (isEmailALreadyExists) {
        return res.status(400).json({
            message: "User already exists",
            errors: [
                {
                    field: "email",
                    message: "User already exists",
                },
            ],
        });
    }

    const user = await userModel.create({
        name,
        email,
        password: await bcrypt.hash(password, 13)
    })

    const accessToken = generateAccessToken({
        userId: user._id,
        role: user.role
    })

    const refreshToken = generateRefreshToken({
        userId: user._id,
        role: user.role
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    })

    await userModel.findByIdAndUpdate(user._id, {
        refreshToken
    })

    res.status(200).json({
        message: "User created successfully",
        data: {
            user: {
                name: user.name,
                email: user.email,
                id: user._id
            }
        },
        accessToken
    })
};

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Email or Password is incorrect",
            errors: [
                {
                    field: "email",
                    message: "Email or Password is incorrect"
                }
            ]
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Email or Password is incorrect",
            errors: [
                {
                    field: "password",
                    message: "Email or Password is incorrect"
                }
            ]
        })
    }


    const accessToken = generateAccessToken({ userId: user._id, role: user.role })

    const refreshToken = generateRefreshToken({ userId: user._id, role: user.role })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    })

    await userModel.findByIdAndUpdate(user._id, {
        refreshToken
    })

    res.status(200).json({
        message: "login successfully",
        data: {
            user: {
                name: user.name,
                email: user.email,
                id: user._id
            }
        },
        accessToken
    })
}

export const refreshController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    console.log(refreshToken)

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token is required",
        })
    }

    try {   
        const decoded = matchRefreshToken(refreshToken);

        const { userId, role } = decoded;

        const user = await userModel.findById(userId);

        if (refreshToken != user.refreshToken) {
            await userModel.findByIdAndUpdate(user._id, {
                refreshToken: null
            })

            return res.status(401).json({
                message: 'Unauthorized User'
            })
        }

        const accessToken = generateAccessToken({ userId, role });

        const newRefreshToken = generateRefreshToken({ userId, role })

        await userModel.findByIdAndUpdate(userId, {
            refreshToken: newRefreshToken
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true
        })

        res.status(200).json({
            message: "Tokens rotated successfully",
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    id: user._id
                }
            },
            accessToken
        })

    } catch (error) {
        return res.status(401).json({
            message: "Invalid refresh token"
        })
    }
}

export const getMe = async (req, res) => {
    const { userId, role } = req.user;

    const user = await userModel.findById(userId);

    res.status(200).json({
        message: "User data fetched succeessfully",
        data: {
            user: {
                name: user.name,
                email: user.email,
                id: user._id
            }
        }
    })
}