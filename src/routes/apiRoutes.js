import express from "express";
import userRoutes from "./v1/userRoutes.js";
import cardRoutes from "./v1/cardRoutes.js";
import authRoutes from "./v1/authRoutes.js";

const router = express.Router();

// User routes
router.use("/v1/user", userRoutes);
// card routes
router.use("/v1/card", cardRoutes);
router.use("/v1/auth", authRoutes);
export default router;