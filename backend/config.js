// @ts-nocheck
const assert = require('assert');

const { JWT_SECRET, PORT, FIXER_ACCESS_KEY, SAMPLE_EMAIL, SAMPLE_PASSWORD } = process.env;

assert.ok(PORT, 'PORT configuration is required.');
assert.ok(JWT_SECRET, 'JWT_SECRET configuration is required.');
assert.ok(FIXER_ACCESS_KEY, 'FIXER_ACCESS_KEY configuration is required.');
assert.ok(SAMPLE_EMAIL, 'SAMPLE_EMAIL configuration is required.');
assert.ok(SAMPLE_PASSWORD, 'SAMPLE_PASSWORD configuration is required.');

module.exports = {
    server: {
        port: PORT,
    },
    auth: {
        secret: JWT_SECRET,
    },
    fixer: {
        accessKey: FIXER_ACCESS_KEY,
    },
    sample: {
        email: SAMPLE_EMAIL,
        password: SAMPLE_PASSWORD,
    },
};
