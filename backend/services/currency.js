const externalServices = require('./external');
const Cache = require('../utils/cache');
const { time } = require('../utils/constants');
const { getCurrentEpochTime } = require('../utils/helper');

const cache = new Cache(5 * time.minute);

const CURRENCY = 'CURRENCY';

/**
 * Returns currency data
 * @param {string[]} currencies
 * @param {string} baseCurrency
 */
async function getCurrencyData(currencies, baseCurrency = 'SEK') {
    const toReturn = {
        base: baseCurrency,
        timestamp: getCurrentEpochTime(),
        currency: {},
    };

    let currencyData = cache.get(CURRENCY);

    if (!currencyData) {
        currencyData = await externalServices.getCurrencyData();
        cache.set(CURRENCY, currencyData);
    }

    const baseCurrencyRate = currencyData[baseCurrency];

    toReturn.currency = currencies.reduce((rateMap, currency) => {
        return {
            ...rateMap,
            [currency]: currencyData[currency] / baseCurrencyRate,
        };
    }, {});

    return toReturn;
}

module.exports = {
    getCurrencyData,
};
