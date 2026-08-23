const mongoose = require("mongoose");

/*
name
description
category
brand
color
imageUrl
*/

const clothingItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Item Name is Required"]
    },
    description: {
        type: String,
        required: [true, "Item Description is Required"]
    },
    category: {
        type: String,
        enum: [
            "Tops",
            "Bottoms",
            "Dresses & Jumpsuits",
            "Outerwear",
            "Activewear",
            "Swimwear",
            "Loungewear",
            "Shoes",
            "Accessories"
        ],
        required: [true, "Category is Required"]
    },
    brand: {
        type: String,
        trim: true
    },
    color: {
        type: String,
        trim: true
    },
    /*
    imageUrl: {
        type: String
    },
    lastWorn: {
        type: Date,
        default: null
    },
    timesWorn: {
        type: Number,
        default: 0
    },*/
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ClothingItem", clothingItemSchema);