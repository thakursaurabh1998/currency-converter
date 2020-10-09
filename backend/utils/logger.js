const pino = require('pino')();
const pinoHttp = require('pino-http');

module.exports = {
    logger: {
        debug: pino.debug.bind(pino),
        info: pino.info.bind(pino),
        warn: pino.warn.bind(pino),
        error: pino.error.bind(pino),
        fatal: pino.fatal.bind(pino),
    },
    requestLogger: pinoHttp({ logger: pino }),
};
