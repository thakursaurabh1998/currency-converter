const externalServices = require('./external');

/**
 * Returns countries list according to the search query
 * @param {string} country
 */
function searchCountryData(country) {
    return externalServices.getCountryDetails(country);
}

module.exports = {
    searchCountryData,
};
