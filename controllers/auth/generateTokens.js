import jwt from "jsonwebtoken";

function sing(payload, isAccessToken) {
    return jwt.sign(
        payload,
        isAccessToken
            ? process.env.ACCESS_TOKEN_SECRET
            : process.env.REFRESH_TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: 3600 }
    );
}

export function generateAccessToken(user) {
    return sing({ user }, true);
}

export function generateRefreshToken(user) {
    return sing({ user }, false);
}

