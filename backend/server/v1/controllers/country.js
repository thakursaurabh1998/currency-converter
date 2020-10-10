const { countrySchema } = require('../request-schema');
const { verifyRequestSchema, createResponse } = require('../../../utils/helper');
const { ErrorType } = require('../../../utils/constants');
const { countryServices, currencyServices } = require('../../../services');

module.exports = {
    search: verifyRequestSchema(async (req, res) => {
        const { query: country, baseCurrency } = req.query;
        try {
            const countryData = await countryServices.searchCountryData(country);
            const currencySet = countryData.reduce((currencyCodeSet, cd) => {
                cd.officialCurrencies.forEach((oc) => {
                    currencyCodeSet.add(oc.code);
                });
                return currencyCodeSet;
            }, new Set());
            const currencyData = await currencyServices.getCurrencyData(
                Array.from(currencySet),
                baseCurrency
            );
            res.json(createResponse(true, null, { countryData, currencyData }));
        } catch (error) {
            req.log.error(error.message);
            res.status(500).json(
                createResponse(false, 'Internal Server Error', null, ErrorType.InternalError)
            );
        }
    }, countrySchema.search),
};
