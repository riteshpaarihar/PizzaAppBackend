import Product from "../schema/productSchema.js";

async function createProduct(productDetails) {
    try {
        const response = await Product.create(productDetails);
        return response;
    } catch (error) {
        // console.error("Error in repository createProduct:", error);
        throw { statusCode: 500, message: "Database error", error: error };
    }
}


export default { createProduct };