const externalServices = require('./external');

function searchCountryData(country) {
    return externalServices.getCountryDetails(country);
}

module.exports = {
    searchCountryData,
};
