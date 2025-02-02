import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig.js';

async function isLoggedIn(req, res, next) {
    try {
        const token = req.cookies["auth_token"]; // Corrected way to access the cookie
        //  console.log(token);
        if (!token) {
            return res.status(401).json({
                message: "No auth token available",
                success: false,
                error: "You are not logged in",
                data: {}
            });
        }

        // Verify token inside a try-catch to handle potential errors
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = {
                email: decoded.email,
                id: decoded.id
            };
            next();
        } catch (err) {
            return res.status(403).json({
                message: "Invalid or expired token",
                success: false,
                error: err.message,
                data: {}
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
            data: {}
        });
    }
}

export default isLoggedIn;