const Cache = require('./lib/Cache');
const { time } = require('./constants');

const rateLimitingCache = new Cache();
const currencyCache = new Cache(5 * time.minute);

module.exports = {
    currencyCache,
    rateLimitingCache,
};
