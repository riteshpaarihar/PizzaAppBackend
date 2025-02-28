import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig.js';
import UnauthorizedError from '../utils/unauthorizedError.js';
//import { error } from 'console';

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
            if (!decoded) {
                throw new UnauthorizedError();
            }
            req.user = {
                email: decoded.email,
                id: decoded.id,
                role: decoded.role,
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


// async function isAdmin(req, res) {
//     const loggedInUser = await req.user;
//     if (loggedInUser.role === "ADMIN") {
//         next();
//     }
//     return res.status(401).json({
//         data: {},
//         success: false,
//         massage: "You are not authorized to access this action",
//         error: {
//             message: "You are not authorized to access this action",
//             status: 401,
//             type: "Unauthorized"
//         }
//     })
// }

async function isAdmin(req, res, next) {
    if (!req.user || req.user.role !== "ADMIN") {
        return res.status(401).json({
            data: {},
            success: false,
            message: "You are not authorized to access this action",
            error: {
                message: "You are not authorized to access this action",
                status: 401,
                type: "Unauthorized"
            }
        });
    }
    next();
}
export default isLoggedIn;
export { isLoggedIn, isAdmin };