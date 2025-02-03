import cloudinary from "../config/cloudinaryConfig.js";
import productRepository from "../repository/productRepository.js";
import fs from "fs/promises";

async function createProduct(productDetails) {
    try {
        let productImage = ""; // Default empty image

        if (productDetails.productImage) {
            const uploadResponse = await cloudinary.uploader.upload(productDetails.productImage);
            productImage = uploadResponse.secure_url;
            await fs.unlink(productDetails.productImage); // Delete local file after upload
        }

        const product = await productRepository.createProduct({
            ...productDetails,
            productImage: productImage, // Save URL, not local path
        });

        if (!product) {
            throw { reason: "Product not created", statusCode: 500, message: "Failed to create product" };
        }

        return product;
    } catch (error) {
        console.error("Error in createProduct:", error);
        throw error;
    }
}

export default createProduct;