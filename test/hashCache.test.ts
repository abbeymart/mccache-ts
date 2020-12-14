/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc: hashCache testing
 */

import { delay, assertEquals, mcTest, postTestResult } from '../../mc-test';

import { setHashCache, getHashCache, deleteHashCache, clearHashCache } from "../src";

// test data
let cacheValue = {firstName: 'Abi', lastName: 'Akindele', location: 'Toronto-Canada'},
    cacheKey = JSON.stringify({name: 'Tab1', location: 'Toronto'}),
    expiryTime = 5, // in seconds
    hashKey = JSON.stringify({hash1: 'Hash1', hash2: 'Hash2'});

(async () => {

    await mcTest({
        name    : "should set and return valid cacheValue",
        testFunc: () => {
            const cacheRes = setHashCache(cacheKey, hashKey, cacheValue, expiryTime);
            if (cacheRes.ok) {
                assertEquals(cacheRes.ok, true);
                assertEquals(cacheRes.value, cacheValue);
                assertEquals(cacheRes.message, 'task completed successfully');
                // get cache info
                const res = getHashCache(cacheKey, hashKey);
                assertEquals(res.ok, true);
                assertEquals(res.value, cacheValue);
                assertEquals(res.message, 'task completed successfully');
            } else {
                assertEquals(cacheRes.ok, false);
            }
        },
    });

    await mcTest({
        name    : "should clear the cache and return nil/empty value",
        testFunc: () => {
            let cacheRes = clearHashCache();
            if (cacheRes.ok) {
                assertEquals(cacheRes.ok, true);
                assertEquals(cacheRes.message, 'task completed successfully');
                // get cache info
                const res = getHashCache(cacheKey, hashKey);
                assertEquals(res.ok, false);
                assertEquals(res.message, 'cache info does not exist');
            } else {
                assertEquals(cacheRes.ok, false);
            }
        },
    });

    await mcTest({
        name    : "should set and return valid cacheValue -> before timeout/expiration)",
        testFunc: () => {
            // change the expiry time to 2 seconds
            const cacheRes = setHashCache(cacheKey, hashKey, cacheValue, 2);
            if (cacheRes.ok) {
                assertEquals(cacheRes.ok, true);
                assertEquals(cacheRes.value, cacheValue);
                assertEquals(cacheRes.message, 'task completed successfully');
                const res = getHashCache(cacheKey, hashKey);
                assertEquals(res.ok, true);
                assertEquals(res.value, cacheValue);
                assertEquals(res.message, 'task completed successfully');
            } else {
                assertEquals(cacheRes.ok, false);
            }
        },
    });

    await mcTest({
        name    : "should return nil value after timeout/expiration",
        testFunc: async () => {
            await delay(3000);
            const res = getHashCache(cacheKey, hashKey);
            assertEquals(res.ok, false);
            assertEquals(res.value, undefined);
            assertEquals(res.message, 'cache expired and deleted');
        },
    });

    await mcTest({
        name    : "should set and return valid cacheValue (repeat prior to deleteCache testing",
        testFunc: () => {
            // change the expiry time to 10 seconds
            let cacheRes = setHashCache(cacheKey, hashKey, cacheValue, 10);
            if (cacheRes.ok) {
                assertEquals(cacheRes.ok, true);
                assertEquals(cacheRes.value, cacheValue);
                assertEquals(cacheRes.message, 'task completed successfully');
                const res = getHashCache(cacheKey, hashKey);
                assertEquals(res.ok, true);
                assertEquals(res.value, cacheValue);
                assertEquals(res.message, 'task completed successfully');
            } else {
                assertEquals(cacheRes.ok, false);
            }
        },
    });

    await mcTest({
        name    : "should delete the cache and return nil/empty value",
        testFunc: () => {
            let cacheRes = deleteHashCache(cacheKey, hashKey);
            if (cacheRes.ok) {
                assertEquals(cacheRes.ok, true);
                assertEquals(cacheRes.message, 'task completed successfully');
                const res = getHashCache(cacheKey, hashKey);
                assertEquals(res.ok, false);
                assertEquals(res.value, undefined);
                assertEquals(res.message, 'cache info does not exist');
            } else {
                assertEquals(cacheRes.ok, false);
            }
        },
    });

    await postTestResult();

})();
