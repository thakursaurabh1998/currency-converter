const { getCurrentEpochTime } = require('../helper');

class Cache {
    /**
     * Simple Cache
     * @param {number} [ttl] time to live in seconds
     */
    constructor(ttl = Infinity) {
        this.cache = new Map();
        this.ttl = ttl;
    }

    get(key) {
        const data = this.cache.get(key);
        if (data) {
            if (this.ttl === Infinity) {
                return data.value;
            }
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
        const toSave = {
            value,
        };
        if (this.ttl !== Infinity) {
            toSave.expiryTime = getCurrentEpochTime() + this.ttl;
        }
        return this.cache.set(key, toSave);
    }
}

module.exports = Cache;
