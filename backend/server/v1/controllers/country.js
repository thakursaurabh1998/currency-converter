const { countrySchema } = require('../request-schema');
const {
    verifyRequestSchema,
    createResponse,
    getCurrentEpochTime,
} = require('../../../utils/helper');
const { ErrorType } = require('../../../utils/constants');
const { countryServices, currencyServices } = require('../../../services');

module.exports = {
    search: verifyRequestSchema(async (req, res) => {
        const { query: country, baseCurrency = 'SEK' } = req.query;
        try {
            const countryData = await countryServices.searchCountryData(country);
            await Promise.all(
                countryData.map((cd) =>
                    Promise.all(
                        cd.officialCurrencies.map(async (oc) => {
                            oc.rate = await currencyServices.getCurrencyData(oc.code, baseCurrency);
                        })
                    )
                )
            );
            res.json(
                createResponse(true, null, {
                    base: baseCurrency,
                    timestamp: getCurrentEpochTime(),
                    countries: countryData,
                })
            );
        } catch (error) {
            req.log.error(error.message);
            res.status(500).json(
                createResponse(false, 'Internal Server Error', null, ErrorType.InternalError)
            );
        }
    }, countrySchema.search),
};
