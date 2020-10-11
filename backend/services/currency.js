const externalServices = require('./external');
const Cache = require('../utils/cache');
const { time } = require('../utils/constants');

const cache = new Cache(5 * time.minute);

const CURRENCY = 'CURRENCY';

async function fetchAllCurrencyData() {
    let currencyData = cache.get(CURRENCY);
    if (!currencyData) {
        currencyData = await externalServices.getCurrencyData();
        cache.set(CURRENCY, currencyData);
    }
    return currencyData;
}

/**
 * Returns currency data rate between to currencies
 * @param {string} toCurrency
 * @param {string} fromCurrency
 */
async function getCurrencyData(toCurrency, fromCurrency) {
    const currencyData = await fetchAllCurrencyData();
    const baseCurrencyRate = currencyData[fromCurrency];
    return currencyData[toCurrency] / baseCurrencyRate;
}

async function getAllCurrenciesList() {
    const currencyData = await fetchAllCurrencyData();
    return Object.keys(currencyData);
}

module.exports = {
    getAllCurrenciesList,
    getCurrencyData,
};
