// @ts-nocheck
const assert = require('assert');
const sinon = require('sinon');
const { it, describe, afterEach } = require('mocha');

const { rateLimitingCache } = require('../utils/localCache');
const rateLimit = require('../services/rateLimitter');
const { getCurrentEpochTime } = require('../utils/helper');

const userId = 'abc@xyz.com';

describe('Rate limitter', () => {
    const rateLimitCacheGetStub = sinon.stub(rateLimitingCache, 'get');
    const rateLimitCacheSetStub = sinon.stub(rateLimitingCache, 'set').returns(null);
    afterEach(() => {
        rateLimitCacheGetStub.reset();
        rateLimitCacheSetStub.reset();
    });
    describe("user doesn't exist", () => {
        it('should create a new counter and allow the user', () => {
            rateLimitCacheGetStub.onCall(0).returns(null);
            rateLimitCacheGetStub.onCall(1).returns({
                allowedRequestsLeft: 30,
                lastResetTime: getCurrentEpochTime() - 30,
            });

            const isAllowed = rateLimit(userId);
            assert.strictEqual(rateLimitCacheGetStub.callCount, 2);
            assert.strictEqual(rateLimitCacheSetStub.callCount, 2);
            assert.ok(isAllowed);
        });
    });

    describe('active user', () => {
        describe('user has no limit left but window is active', () => {
            it('should not allow user', () => {
                rateLimitCacheGetStub.onCall(0).returns({
                    allowedRequestsLeft: 0,
                    lastResetTime: getCurrentEpochTime() - 30,
                });

                const isAllowed = rateLimit(userId);
                assert.strictEqual(isAllowed, false);
            });
        });

        describe('user window is over', () => {
            it('should allow the user', () => {
                rateLimitCacheGetStub.onCall(0).returns({
                    allowedRequestsLeft: 0,
                    lastResetTime: getCurrentEpochTime() - 61,
                });

                const isAllowed = rateLimit(userId);
                assert.ok(isAllowed);
            });
        });
    });
});
