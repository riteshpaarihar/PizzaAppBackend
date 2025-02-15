import express from "express";
import userRoutes from "./v1/userRoutes.js";
import cardRoutes from "./v1/cardRoutes.js";
import authRoutes from "./v1/authRoutes.js";
import productRouter from "./v1/productRoutes.js";

const router = express.Router();

// User routes
router.use("/v1/user", userRoutes);
// card routes
router.use("/v1/card", cardRoutes);
// auth routes
router.use("/v1/auth", authRoutes);
// product routes
router.use("/v1/product", productRouter);
//router.use("/v1/product", productRouter);
export default router;