const { createResponse } = require('../../../utils/helper');
const { ErrorType } = require('../../../utils/constants');
const { currencyServices } = require('../../../services');

module.exports = {
    currenciesList: async (req, res) => {
        try {
            const currenciesList = await currencyServices.getAllCurrenciesList();
            res.json(createResponse(true, null, currenciesList));
        } catch (error) {
            req.log.error(error.message);
            res.status(500).json(
                createResponse(false, 'Internal Server Error', null, ErrorType.InternalError)
            );
        }
    },
};
