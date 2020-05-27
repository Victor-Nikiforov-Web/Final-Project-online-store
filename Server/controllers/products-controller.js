const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const productsLogic = require('../business-logic/products-logic');
const fs = require('fs');

router.get('/get-all-products', async (request, response) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/search-product/:name', async (request, response) => {
    try {
        const name = request.params.name;
        const result = await productsLogic.searchProduct(name);
        response.json(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/image/:name', async (request, response) => {
    try {
        const name = request.params.name;
        fs.readFile('../server/uploads/products/' + name,(err,data)=> {
            if(err){
                throw err;
            }
            response.end(data);
        });
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;