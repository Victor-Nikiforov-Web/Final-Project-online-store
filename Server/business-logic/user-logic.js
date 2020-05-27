const User = require('../models/user');
const cryptography = require('../helpers/cryptography');

/// ------- Register -------- //
function addUser(user) {
    user.password = cryptography.hash(user.password);
    return user.save();
}

function checkEmail(email) {
    return User.find({ email }).exec();
}

function checkId(id) {
    return User.find({ id }).exec();
}

/// ------- Login -------- //
function login(details) {
    details.password = cryptography.hash(details.password);
    return User.find({ email: details.email, password: details.password });
}


module.exports = {
    addUser,
    checkEmail,
    checkId,
    login
}