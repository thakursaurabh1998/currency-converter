// @ts-nocheck
const assert = require('assert');

const { JWT_SECRET, PORT, FIXER_ACCESS_KEY, NODE_ENV, SAMPLE_EMAIL, SAMPLE_PASSWORD } = process.env;

assert.ok(PORT, 'PORT configuration is required.');
assert.ok(JWT_SECRET, 'JWT_SECRET configuration is required.');
assert.ok(FIXER_ACCESS_KEY, 'FIXER_ACCESS_KEY configuration is required.');
assert.ok(SAMPLE_EMAIL, 'SAMPLE_EMAIL configuration is required.');
assert.ok(SAMPLE_PASSWORD, 'SAMPLE_PASSWORD configuration is required.');
assert.ok(NODE_ENV, 'NODE_ENV configuration is required.');

module.exports = {
    environment: NODE_ENV,
    server: {
        port: Number.parseInt(PORT, 10) || 5000,
    },
    auth: {
        secret: JWT_SECRET,
        ttl: '1h',
    },
    fixer: {
        baseUrl: 'http://data.fixer.io/api',
        accessKey: FIXER_ACCESS_KEY,
    },
    restcountries: {
        baseUrl: 'https://restcountries.eu/rest/v2',
    },
    sample: {
        email: SAMPLE_EMAIL,
        password: SAMPLE_PASSWORD,
    },
};
