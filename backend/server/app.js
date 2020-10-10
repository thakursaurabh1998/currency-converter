const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const config = require('../config');
const v1Routes = require('./v1/routes');
const { requestLogger, logger } = require('../utils/logger');
const { createResponse } = require('../utils/helper');

const app = express();

app.use(requestLogger);
app.use(cookieParser());
app.use(bodyParser.json());

if (config.environment !== 'production') {
    app.use(
        cors({
            origin: ['http://localhost:3000'],
            credentials: true,
            allowedHeaders:
                'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token, X-SC-JWT, Cache-Control',
        })
    );
}

app.get('/health', (req, res) => {
    res.status(200).json(createResponse(true, null, "I'm Healthy!"));
});

app.use('/v1', v1Routes);

app.use((req, res) => {
    res.status(404).json(createResponse(false, ['Not Found']));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    logger.fatal({
        type: 'INTERNAL_SERVER_ERROR',
        err,
    });
    res.status(500).json({
        data: "Something isn't right",
    });
});

let server = null;

module.exports = {
    start: () => {
        server = app.listen(config.server.port);
        logger.info(`API running on port - ${config.server.port}`);
    },

    // manage graceful shutdown with this function
    stop: () => {
        if (!server) {
            throw new Error('Server not started yet');
        }
        server.close();
    },
};
