const config = require('../config');
const { rateLimitingCache } = require('../utils/localCache');
const { getCurrentEpochTime } = require('../utils/helper');

function decrementRequestsLeft(userId) {
    const userRateLimittingData = rateLimitingCache.get(userId);
    rateLimitingCache.set(userId, {
        ...userRateLimittingData,
        allowedRequestsLeft: userRateLimittingData - 1,
    });
}

function resetUserRateLimit(userId) {
    const resetValue = {
        allowedRequestsLeft: config.rateLimit.allowedRequestsPerTimeDuration,
        lastResetTime: getCurrentEpochTime(),
    };
    rateLimitingCache.set(userId, resetValue);
    return resetValue;
}

function rateLimit(userId) {
    let userRateLimitData = rateLimitingCache.get(userId);
    const currentEpochTime = getCurrentEpochTime();

    if (!userRateLimitData) {
        userRateLimitData = resetUserRateLimit(userId);
    } else if (
        currentEpochTime - userRateLimitData.lastResetTime >
        config.rateLimit.timeDurationInSeconds
    ) {
        userRateLimitData = resetUserRateLimit(userId);
    } else if (userRateLimitData.allowedRequestsLeft <= 0) {
        return false;
    }

    decrementRequestsLeft(userId);

    return true;
}

module.exports = rateLimit;
