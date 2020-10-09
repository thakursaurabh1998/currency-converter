const server = require('./server/app');
const { logger } = require('./utils/logger');

server.start();

function handleKillSignals(signal) {
    logger.info(`${signal} SIGNAL RECEIVED`);
    server.stop();
    logger.info('HTTP Server closed');
}

process.on('SIGINT', handleKillSignals);
process.on('SIGTERM', handleKillSignals);
process.on('uncaughtException', logger.fatal);
