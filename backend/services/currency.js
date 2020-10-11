const externalServices = require('./external');
const { currencyCache } = require('../utils/localCache');

const CURRENCY = 'CURRENCY';

async function fetchAllCurrencyData() {
    let currencyData = currencyCache.get(CURRENCY);
    if (!currencyData) {
        currencyData = await externalServices.getCurrencyData();
        currencyCache.set(CURRENCY, currencyData);
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
