const { authSchema } = require('../request-schema');
const { verifyRequestSchema, createResponse } = require('../../../utils/helper');
const { ErrorType } = require('../../../utils/constants');
const { authServices, rateLimitterService } = require('../../../services');
const config = require('../../../config');

module.exports = {
    login: verifyRequestSchema((req, res) => {
        const { email, password } = req.body;
        const isVerified = authServices.verifyUser(email, password);
        if (isVerified) {
            const token = authServices.createToken(email, config.auth.ttl);
            res.json(createResponse(true, null, { accessToken: token }));
        } else {
            res.status(401).json(
                createResponse(false, ['User verfication Failed'], null, ErrorType.AuthError)
            );
        }
    }, authSchema.login),

    validateToken: (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            return res
                .status(401)
                .json(
                    createResponse(false, [
                        'authorization header missing',
                        null,
                        ErrorType.AuthError,
                    ])
                );
        }

        const [isTokenValid, decodedToken] = authServices.checkTokenValidity(token);

        if (!isTokenValid) {
            return res
                .status(401)
                .json(createResponse(false, ['Invalid Token'], null, ErrorType.AuthError));
        }

        // attach user info to the request context
        req.user = decodedToken;
        return next();
    },

    rateLimit: (req, res, next) => {
        const isRequestAllowed = rateLimitterService(req.user.email);
        if (isRequestAllowed) {
            return next();
        }
        return res
            .status(429)
            .json(
                createResponse(
                    false,
                    [
                        `You've reached limit for API requests ${config.rateLimit.allowedRequestsPerTimeDuration} per ${config.rateLimit.allowedRequestsPerTimeDuration} seconds`,
                    ],
                    ErrorType.TooManyRequests
                )
            );
    },
};
