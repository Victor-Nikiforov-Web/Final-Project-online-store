const mongoose = require("mongoose");

const CartDetailSchema = mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

CartDetailSchema.virtual("cartDetail", {
    ref: "Product",
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

CartDetailSchema.virtual("cart", {
    ref: "Cart",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});


const CartDetail = mongoose.model("CartDetail", CartDetailSchema, "cart-details");

module.exports = CartDetail;
