
import { jsonResponse } from "../../lib/json-response.js";
import { getTokenFromHeader } from "./getTokenFromHeader.js";
import { verifyAccessToken } from "./verifyTokens.js";

export function authenticate(req, res, next) {
    const token = getTokenFromHeader(req.headers)

    if (token) {
        const decoded = verifyAccessToken(token);

        if (decoded) {
            req.user = { ...decoded.user }
            next();
        } else {
            res.status(401).json(jsonResponse(401, { messaje: "No token provided" }))
        }
        
    } else {
        res.status(401).json(jsonResponse(401, { messaje: "No token provided" }))
    }
}