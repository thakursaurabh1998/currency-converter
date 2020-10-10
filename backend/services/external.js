// http://data.fixer.io/api/latest?access_key=65a46a3c3c9c4a87ab07b6a72500b80d To fetch latest currency rates

const config = require('../config');

const Axios = require('axios').default;

/**
 * Returns country data in a format which is independent of the data provider
 * @param {string} countryName Can be a partial or full country name
 * @returns {Promise<{
 *     fullName: string,
 *     population: number,
 *     officialCurrencies: {code: string, name: string, symbol: string}[]
 * }>}
 */
async function getCountryDetails(countryName) {
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
}

module.exports = {
    getCountryDetails,
};
