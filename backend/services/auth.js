const jwt = require('jsonwebtoken');

const config = require('../config');

function checkTokenValidity(token) {
    try {
        const decodedToken = jwt.verify(token, config.auth.secret);
        return [true, decodedToken];
    } catch (error) {
        return [false];
    }
}

async function verify(email, userInputPassword, userType) {}

module.exports = {
    checkTokenValidity,
    verify,
};
