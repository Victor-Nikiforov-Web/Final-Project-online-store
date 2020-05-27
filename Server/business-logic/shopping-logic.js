const Cart = require('../models/cart');
const CartDetail = require('../models/cart-detail');

function createCart(cart) {
    return cart.save();
}

function addProduct(product) {
    return product.save();
}

function checkIfProductExistsInCart(product) {
    return CartDetail.findOne({ cartId: product.cartId, productId: product.productId });
}

function updateProduct(product) {
    return new Promise((resolve, reject) => {
        CartDetail.updateOne({ _id: product._id }, product, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(info.n ? product : null);
        });
    });
}

function getAllProductsOfCart(cartId) {
    return CartDetail.find({ cartId: cartId }).exec();
}

function deleteProductFromCart(_id) {
    return CartDetail.deleteOne({ _id });
}

function clearCart(cartId) {
    return CartDetail.deleteMany({cartId });
}

function deleteCart(_id) {
    return Cart.deleteOne({ _id });
}

module.exports = {
    createCart,
    addProduct,
    checkIfProductExistsInCart,
    updateProduct,
    getAllProductsOfCart,
    deleteProductFromCart,
    clearCart,
    deleteCart
}