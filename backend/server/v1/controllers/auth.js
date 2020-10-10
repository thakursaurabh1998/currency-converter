const { authSchema } = require('../request-schema');
const { verifyRequestSchema, createResponse } = require('../../../utils/helper');
const { ErrorType } = require('../../../utils/constants');
const { authServices } = require('../../../services');

module.exports = {
    login: verifyRequestSchema((req, res) => {
        const { email, password } = req.body;
        const isVerified = authServices.verifyUser(email, password);
        if (isVerified) {
            const token = authServices.createToken(email);
            res.json(createResponse(true, null, { accessToken: token }));
        } else {
            res.status(401).json(
                createResponse(false, ['User verfication Failed'], null, ErrorType.AuthError)
            );
        }
    }, authSchema.login),
};
