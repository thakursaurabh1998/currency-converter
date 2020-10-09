const { authSchema } = require('../request-schema');
const { verifyRequestSchema, createResponse } = require('../../../utils/helper');
const { authServices } = require('../../../services');

module.exports = {
    login: verifyRequestSchema(async (req, res) => {}, authSchema.login),
};
