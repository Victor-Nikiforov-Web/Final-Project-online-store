require("./data-access-layer/dal");
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require("cors");
// controllers
const userController = require('./controllers/user-controller');
const productsController = require('./controllers/products-controller');
const shoppingController = require('./controllers/shopping-controller');
const orderController = require('./controllers/order-controller');
const adminController = require('./controllers/admin-controller');

const server = express();

server.use(cors());
server.use(fileUpload());
server.use(express.json());

server.use('/api/user', userController);
server.use('/api/products', productsController);
server.use('/api/shopping', shoppingController);
server.use('/api/order', orderController);
server.use('/api/admin', adminController);

server.listen(3000, () => console.log("Listening on http://localhost:3000"));