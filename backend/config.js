// @ts-nocheck
const assert = require('assert');

const { JWT_SECRET, PORT } = process.env;

assert.ok(PORT, 'PORT configuration is required.');
assert.ok(JWT_SECRET, 'JWT_SECRET configuration is required.');

module.exports = {
    server: {
        port: PORT,
    },
    auth: {
        secret: JWT_SECRET,
    },
};
