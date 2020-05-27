const Product = require('../models/product');
const Category = require('../models/category');

function updateProduct(product) {
    return new Promise((resolve, reject) => {
        Product.updateOne({ _id: product._id }, product, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(info.n ? product : null);
        });
    });
}

function addProduct(product) {
    return product.save();
}

function getAllCategories() {
    return Category.find({}).exec();
}

module.exports = {
    updateProduct,
    addProduct,
    getAllCategories
}