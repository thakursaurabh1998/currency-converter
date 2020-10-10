const jwt = require('jsonwebtoken');

const config = require('../config');

/**
 * Creates a JWT
 * @param {string} email
 */
function createToken(email) {
    const token = jwt.sign({ email }, config.auth.secret);
    return token;
}

/**
 * Verifies if the token is valid and also returns the token
 * @param {string} token
 * @returns {[boolean, string | object]}
 */
function checkTokenValidity(token) {
    try {
        const decodedToken = jwt.verify(token, config.auth.secret);
        return [true, decodedToken];
    } catch (error) {
        return [false, null];
    }
}

/**
 * Returns if the user is verified, currently only checks with a defined value
 * @param {string} email
 * @param {string} password
 */
function verifyUser(email, password) {
    return email === config.sample.email && password === config.sample.password;
}

module.exports = {
    checkTokenValidity,
    createToken,
    verifyUser,
};
