import { matchAccessToken } from "../utils/auth.utils.js";

export const authenticate = (req, res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
        return res.status(400).json({
            message: "Access token is not found on request header"
        })
    }

    try {

        const decoded = matchAccessToken(accessToken);

        req.user = decoded

        next()
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired refresh token"
        })
    }
}

export const authenticateSeller = (req, res, next) => {

    if (req.user.role !== "seller") {
        return res.status(403).json({
            message: "Access denied. Only sellers are allowed to perform this action."
        })
    }
    
    next()

}