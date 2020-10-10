const externalServices = require('./external');
const Cache = require('../utils/cache');
const { time } = require('../utils/constants');

const cache = new Cache(5 * time.minute);

const CURRENCY = 'CURRENCY';

/**
 * Returns currency data rate between to currencies
 * @param {string} toCurrency
 * @param {string} fromCurrency
 */
async function getCurrencyData(toCurrency, fromCurrency) {
    let currencyData = cache.get(CURRENCY);
    if (!currencyData) {
        currencyData = await externalServices.getCurrencyData();
        cache.set(CURRENCY, currencyData);
    }
    const baseCurrencyRate = currencyData[fromCurrency];
    return currencyData[toCurrency] / baseCurrencyRate;
}

module.exports = {
    getCurrencyData,
};
