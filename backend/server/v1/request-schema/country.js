const Joi = require('joi');

module.exports = {
    search: {
        query: Joi.object({
            query: Joi.string().min(3).required(),
            baseCurrency: Joi.string().min(3),
        }),
    },
};
