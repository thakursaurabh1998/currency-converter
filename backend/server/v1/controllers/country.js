const { countrySchema } = require('../request-schema');
const { verifyRequestSchema, createResponse } = require('../../../utils/helper');
const { ErrorType } = require('../../../utils/constants');
const { countryServices } = require('../../../services');

module.exports = {
    search: verifyRequestSchema(async (req, res) => {
        const { query: country } = req.query;
        try {
            const countryData = await countryServices.searchCountryData(country);
            res.json(createResponse(true, null, countryData));
        } catch (error) {
            req.log.error(error);
            res.status(500).json(
                createResponse(false, 'Internal Server Error', null, ErrorType.InternalError)
            );
        }
    }, countrySchema.search),
};
