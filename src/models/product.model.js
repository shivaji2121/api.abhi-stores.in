const mongoose = require('mongoose');
require('dotenv').config();

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
    },
    category: {
        type: String,
        enum: ['electronics', 'clothing', 'books', 'home', 'food', 'beauty', 'sports', 'other'],
        required: [true, "Product category is required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    ratings: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        rating: {
            type: Number,
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot exceed 5"],
        },
        review: {
            type: String,
            default: "",
        }
    }

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);