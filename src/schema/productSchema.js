import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product Name is required"],
        unique: true,
        minlength: [3, "Product Name must be between 3 and 255 characters"],
        maxlength: [50, "Product Name must be between 50 and 255 characters"],
        trim: true
    },
    description: {
        type: String,
        required: [false, "Description is optional"],
        minlength: [10, "Description must be between 10 and 255 characters"],
        maxlength: [255, "Description must be between 10 and 255 characters"],
        trim: true
    },
    productImage: {
        type: String,
        required: false,

    },
    productPrice: {
        type: Number,
        required: [true, "Product Price is required"],
        min: [0, "Product Price must be at least 0"],
        //  max: [1000, "Product Price must be less than 1000"]
    },
    catgory: {
        type: String,
        required: [true, "Category is required"],
        enum: ["veg", "non veg", "drink", "slides", "Other"],
        default: "veg",
    },
    inStock: {
        type: Boolean,
        required: [true, "Product Stock is required"],
        default: true,
    }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema);