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
        console.log("product ", product);

        if (!product) {
            throw { reason: "Product not created", statusCode: 500, message: "Failed to create product" };
        }

        return product;
    } catch (error) {
        console.error("Error in createProduct:", error);
        throw error;
    }
}

async function getProductById(productId) {
    try {
        const response = await productRepository.getProductById(productId);
        if (!response) {
            throw { reason: "Product not found", statusCode: 404, message: "Product not found" };
        }
    } catch (error) {
        console.log("Error in getProductById: ", error);
    }
}


async function getAllProducts() {
    try {
        const products = await productRepository.getAllProducts();
        return products;
    } catch (error) {
        console.error("Error in getAllProducts:", error);
        throw error;
    }
}

async function deleteProductById(productId) {
    try {
        const product = await getProductById(productId);
        const result = await productRepository.deleteProductById(productId);
        if (!result) {
            throw { reason: "Product not deleted", statusCode: 404, message: "Product not found" };
        }
    } catch (error) {
        console.error("Error in deleteProductById: ", error);
    }
}

export default { createProduct, getProductById, getAllProducts, deleteProductById };