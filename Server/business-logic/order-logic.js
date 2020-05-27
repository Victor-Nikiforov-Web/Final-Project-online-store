const Order = require('../models/order');
const fs = require("fs");
const shoppingLogic = require('./shopping-logic');

function addOrder(order){
    return order.save();
}

function getAllOrders(){
    return Order.find({}).exec();
}

function createReceipt(fileName, text){
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, text, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve(fileName.substr(fileName.lastIndexOf('/')));
        });
    });
}

async function receiptContent(order){
    const products = await shoppingLogic.getAllProductsOfCart(order.cartId);
    return "Online Store" + "\n" + "--------------" + "\n" + order.orderDate + "\n" 
    + "--------------" + "\n" + "Name |   " + "Amount |   " + "Price | " + "\n"
    + " ------------------" + "\n"
    + products.map(p => `${p.name}` + "     " + `${p.amount}` + "     " + `       ${p.price}` + "\n")
    + "--------------" + "\n" + `Total Price : ${order.totalPrice} $` ;

}

module.exports = {
    addOrder,
    getAllOrders,
    createReceipt,
    receiptContent
}