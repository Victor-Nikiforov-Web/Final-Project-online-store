const Product = require('../models/product');

function getAllProducts() {
    return Product.find({}).populate("categories").exec();
}

function searchProduct(name) {
    return Product.find({ name: new RegExp(name)}).exec();
} 

module.exports = {
    getAllProducts,
    searchProduct
}