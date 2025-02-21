import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }

}, {
    timestamps: true,
})