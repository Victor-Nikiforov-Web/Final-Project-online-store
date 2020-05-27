const express = require('express');
const router = express.Router();
const shoppingLogic = require('../business-logic/shopping-logic');
const Cart = require('../models/cart');
const CartDetail = require('../models/cart-detail');

router.post('/create-cart', async (request, response) => {
    try {
        const cart = new Cart();
        cart.date = new Date();
        cart.userId = request.body;
        const myCart = await shoppingLogic.createCart(cart);
        response.json(myCart);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/add-product', async (request, response) => {
    try {
        const product = new CartDetail(request.body);
        const checkProduct = await shoppingLogic.checkIfProductExistsInCart(product);
        if (checkProduct) {
            throw 'Product already in cart !'
        }
        const addedProduct = await shoppingLogic.addProduct(product);
        response.json(addedProduct);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/get-all-products', async (request, response) => {
    try {
        const cartId = request.body.cartId;
        const products = await shoppingLogic.getAllProductsOfCart(cartId);
        response.json(products);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.put('/update-product', async (request, response) => {
    try {
        const oldProduct = new CartDetail(request.body);
        const product = await shoppingLogic.updateProduct(oldProduct);
        if (product === null) {
            response.sendStatus(404);
            return;
        }
        response.json(product);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete('/remove-product/:_id', async (request, response) => {
    try {
        const _id = request.params._id;
        await shoppingLogic.deleteProductFromCart(_id);
        response.sendStatus(204);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete('/delete-cart/:_id', async (request, response) => {
    try {
        const _id = request.params._id;
        await shoppingLogic.clearCart(_id);
        await shoppingLogic.deleteCart(_id);
        response.sendStatus(204);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;