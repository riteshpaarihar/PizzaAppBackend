import { MongooseError } from "mongoose";
import Product from "../schema/productSchema.js";
import InternalServerError from "../utils/internalServerError.js";
import BadRequestError from "../utils/badRequestError.js";
async function createProduct(productDetails) {
    try {
        const response = await Product.create(productDetails);
        return response;
    } catch (error) {
        if (error.name === "MongooseError") {
            throw new InternalServerError();
        } else if (error.name == "validationError") {
            const errorMassageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMassageList);
        }
        console.log(error);
        // console.error("Error in repository createProduct:", error);
        //throw { statusCode: 500, message: "Database error", error: error };
    }
}

// async function getProductById(productId) {
//     try {
//         const response = await Product.findById(productId);
//         return response;
//     } catch (error) {
//         console.error("Error in repository getProductById:", error);
//         throw new InternalServerError();
//     }
// }

async function getProductById(productId) {
    try {
        console.log("Searching for product with ID:", productId);

        const product = await Product.findById(productId);
        console.log("Query Result:", product);

        if (!product) {
            console.log("Product not found in database");
            return null;
        }

        return product;
    } catch (error) {
        console.error("Error in repository getProductById:", error);
        throw new Error(error.message || "Internal Server Error");
    }
}


async function getAllProducts() {
    try {
        const response = await Product.find({});
        return response;
    } catch (error) {
        console.error("Error in repository getAllProducts:", error);
        throw {
            statusCode: 500,
            message: "Database error",
            error: error
        };
    }
}

async function deleteProductById(productId) {
    try {
        await Product.findByIdAndDelete(productId);
        return { message: "Product deleted successfully" };
    } catch (error) {
        console.error("Error in repository deleteProductById:", error);
        throw {
            statusCode: 500,
            message: "Database error",
            error: error
        };
    }
}

async function updateProductById(productId, updatedProductDetails) {
    try {
        const response = await Product.findByIdAndUpdate(
            productId,
            updatedProductDetails, { new: true }
        );
        return response;
    } catch (error) {
        console.error("Error in repository updateProductById:", error);
        throw {
            statusCode: 500,
            message: "Database error",
            error: error
        };
    }
}
export default { createProduct, getProductById, getAllProducts, deleteProductById, updateProductById };