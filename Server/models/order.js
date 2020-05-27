const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    shippingDate: {
        type: Date,
        required: true
    },
    orderDate: {
        type: Date,
        required: true,
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    street: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    creditCard: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        minlength: 2,
        maxlength: 30
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

OrderSchema.virtual("order-cartId", {
    ref: "Cart",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

const Order = mongoose.model("Order", OrderSchema, "orders");

module.exports = Order;
