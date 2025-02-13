import productService from '../services/productService.js';

export async function addProduct(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Product image is required",
                data: {},
                error: {},
            });
        }

        const product = await productService.createProduct({
            productName: req.body.productName,
            description: req.body.description,
            productPrice: req.body.productPrice,
            category: req.body.category,
            inStock: req.body.inStock,
            productImage: req.file.path,
        });

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product,
            error: {},
        });
    } catch (error) {
        console.error("Error in addProduct:", error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
            data: {},
            error: error,
        });
    }
}

// export async function getProduct(req, res) {
//     try {
//         const response = await productService.getProductById(req.params.id);
//         return res.status(200).json({
//             success: true,
//             message: "Product fetched successfully",
//             data: response,
//             error: {},
//         });
//     } catch (error) {
//         console.error("Error in getProduct:", error);
//         return res.status(error.statusCode || 500).json({
//             success: false,
//             message: error.message || "Internal Server Error",
//             data: {},
//             error: error,
//         });
//     }
// }

export async function getProduct(req, res) {
    try {
        const productId = req.params.id;

        // Check if productId is a valid MongoDB ObjectId
        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
                data: {},
                error: {},
            });
        }

        const response = await productService.getProductById(productId);

        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: {},
                error: {},
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: response,
            error: {},
        });
    } catch (error) {
        console.error("Error in getProduct:", error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
            data: {},
            error: error,
        });
    }
}

export async function deleteProduct(req, res) {
    try {
        const response = await productService.deleteProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: response,
            error: {},
        });
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
            data: {},
            error: error,
        });
    }
}