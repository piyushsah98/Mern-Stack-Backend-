import jwt from 'jsonwebtoken'
import config from '../config/config.js'


export const generateAccessToken = ({ userId, role }) => {
    const accessToken = jwt.sign({
        userId, role
    }, config.ACCESS_TOKEN_SECRET, { expiresIn: "15Min" })

    return accessToken
}

export const matchAccessToken = (accessToken) => {
    return jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET)
}

export const generateRefreshToken = ({ userId, role }) => {
    const refreshToken = jwt.sign({
        userId, role
    }, config.REFRESH_TOKEN_SECRET, { expiresIn: "7Days" })

    return refreshToken
}


export const matchRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
}
