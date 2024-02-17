const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: String, // Change to lowercase n
    price: Number
});

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
