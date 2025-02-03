import createProduct from "../services/productService.js";



async function addProduct(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Product image is required",
                data: {},
                error: {},
            });
        }

        const product = await createProduct({
            productName: req.body.productName,
            description: req.body.description,
            productPrice: req.body.productPrice,
            category: req.body.category, // Fix typo: 'catgory' -> 'category'
            inStock: req.body.inStock,
            productImage: req.file.path, // ✅ Fix: Use req.file.path
        });

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product,
            error: {},
        });
    } catch (error) {
        console.error("Error in addProduct:", error); // Debugging log
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
            data: {},
            error: error,
        });
    }
}

export default addProduct;