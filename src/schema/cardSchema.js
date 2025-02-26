import mongoose, { Schema } from "mongoose";
import Product from "./productSchema";

const CardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        }
    }]

}, {
    timestamps: true,
})

const Card = mongoose.model("Card", CardSchema);
export default Card;