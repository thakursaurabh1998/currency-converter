const { getCurrentEpochTime } = require('./helper');

class Cache {
    /**
     * Simple Cache
     * @param {number} ttl time to live in seconds
     */
    constructor(ttl) {
        this.cache = new Map();
        this.ttl = ttl;
    }

    get(key) {
        const data = this.cache.get(key);
        if (data) {
            const currentEpochTime = getCurrentEpochTime();
            if (currentEpochTime < data.expiryTime) {
                return data.value;
            }
            this.cache.set(key, null);
            return null;
        }
        return null;
    }

    set(key, value) {
        return this.cache.set(key, {
            value,
            expiryTime: getCurrentEpochTime() + this.ttl,
        });
    }
}

module.exports = Cache;
