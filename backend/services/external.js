const Axios = require('axios').default;

const config = require('../config');

/**
 * Returns country data in a format which is independent of the data provider
 * @param {string} countryName Can be a partial or full country name
 * @returns {Promise<{
 *     fullName: string,
 *     population: number,
 *     officialCurrencies: {code: string, name: string, symbol: string}[]
 * }[]>}
 */
async function getCountryDetails(countryName) {
    try {
        const response = await Axios.get(`${config.restcountries.baseUrl}/name/${countryName}`);
        const massagedCountryData = response.data.map((cd) => {
            return {
                fullName: cd.name,
                population: cd.population,
                officialCurrencies: cd.currencies.map(({ code, name, symbol }) => ({
                    code,
                    name,
                    symbol,
                })),
            };
        });
        return massagedCountryData;
    } catch (error) {
        // if country not found
        if (error.response.status === 404) {
            return [];
        }
        throw error;
    }
}

async function getCurrencyData() {
    const response = await Axios.get(`${config.fixer.baseUrl}/latest`, {
        params: {
            access_key: config.fixer.accessKey,
        },
    });

    if (response.data.success) {
        return response.data.rates;
    }
    throw new Error(response.data.error.info);
}

module.exports = {
    getCountryDetails,
    getCurrencyData,
};
