const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        minlength: 6,
        maxlength: 10
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 40
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    city: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    street: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 60
    },
    isAdmin: Boolean
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

UserSchema.virtual("shoppingCart", {
    ref: "Cart",
    localField: "_id",
    foreignField: "userId"
});
const User = mongoose.model("User", UserSchema, "users");

module.exports = User;
