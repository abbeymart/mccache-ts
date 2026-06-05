/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14 | @Updated: 2026-06-05
 * @Company: Copyright 2020 Abi Akindele | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc: hashCache testing
 */

import { delay, newTest, testResult, UnitTestResult, } from "@mconnect/mctest";

import {
    clearHashCache, deleteHashCache, getHashCache, HashCacheParamsType, ObjectType, QueryHashCacheParamsType,
    setHashCache
} from "../src";

// test data
let cacheValue: ObjectType = {firstName: "Abi", lastName: "Akindele", location: "Toronto-Canada"},
    cacheKey: string = JSON.stringify({name: "Tab1", location: "Toronto"}),
    expiryTime = 5, // in seconds
    hashKey = JSON.stringify({hash1: "Hash1", hash2: "Hash2"});

(async () => {

    const results: Array<UnitTestResult> = []

    const test1 = newTest({
        name: "should set and return valid cacheValue",
    })
    test1.setTestFunction(() => {
        const cacheParams: HashCacheParamsType<ObjectType> = {
            key   : cacheKey,
            hash  : hashKey,
            value : cacheValue,
            expire: expiryTime,
        }
        const cacheRes = setHashCache(cacheParams);
        if (cacheRes.ok) {
            test1.assertEquals(cacheRes.ok, true);
            test1.assertEquals(cacheRes.value as ObjectType, cacheValue);
            test1.assertEquals(cacheRes.message as string, "task completed successfully");
            // get cache info
            const getCacheParams: QueryHashCacheParamsType = {
                key : cacheKey,
                hash: hashKey,
            }
            const res = getHashCache<ObjectType>(getCacheParams);
            test1.assertEquals(res.ok, true);
            test1.assertEquals(res.value as ObjectType, cacheValue);
            test1.assertEquals(res.message as string, "task completed successfully");
        } else {
            test1.assertEquals(cacheRes.ok, false);
        }
    })
    const test1Res = test1.runTest();
    results.push(test1Res);


    const test2 = newTest({
        name: "should clear the cache and return nil/empty value",
    })
    test2.setTestFunction(() => {
        let cacheRes = clearHashCache<ObjectType>();
        if (cacheRes.ok) {
            test2.assertEquals(cacheRes.ok, true);
            test2.assertEquals(cacheRes.message as string, "task completed successfully");
            // get cache info
            const getCacheParams: QueryHashCacheParamsType = {
                key : cacheKey,
                hash: hashKey,
            }
            const res = getHashCache<ObjectType>(getCacheParams);
            test2.assertEquals(res.ok, false);
            test2.assertEquals(res.message === "cache info does not exist" || res.message === "cache expired and deleted", true);
        } else {
            test2.assertEquals(cacheRes.ok, false);
        }
    })
    const test2Res = test2.runTest();
    results.push(test2Res);

    const test3 = newTest({
        name: "should set and return valid cacheValue -> before timeout/expiration",
    })
    test3.setTestFunction(() => {
        // change the expiry time to 2 seconds
        const cacheParams: HashCacheParamsType<ObjectType> = {
            key   : cacheKey,
            hash  : hashKey,
            value : cacheValue,
            expire: 2,
        }
        const cacheRes = setHashCache(cacheParams);
        if (cacheRes.ok) {
            test3.assertEquals(cacheRes.ok, true);
            test3.assertEquals(cacheRes.value as ObjectType, cacheValue);
            test3.assertEquals(cacheRes.message as string, "task completed successfully");
            const getCacheParams: QueryHashCacheParamsType = {
                key : cacheKey,
                hash: hashKey,
            }
            const res = getHashCache<ObjectType>(getCacheParams);
            test3.assertEquals(res.ok, true);
            test3.assertEquals(res.value as ObjectType, cacheValue);
            test3.assertEquals(res.message as string, "task completed successfully");
        } else {
            test3.assertEquals(cacheRes.ok, false);
        }
    })
    const test3Res = test3.runTest();
    results.push(test3Res);

    const test4 = newTest({
        name: "should return nil value after timeout/expiration",
    })
    await delay(3000);
    test4.setTestFunction(async () => {
        const getCacheParams: QueryHashCacheParamsType = {
            key : cacheKey,
            hash: hashKey,
        }
        const res = getHashCache(getCacheParams);
        test4.assertEquals(res.ok, false);
        test4.assertEquals(res.value === undefined, true);
        test4.assertEquals(res.message === "cache info does not exist" || res.message === "cache expired and deleted", true);
    })
    const test4Res = test4.runTest();
    results.push(test4Res);

    const test5 = newTest({
        name: "should set and return valid cacheValue (repeat prior to deleteCache testing)",
    })
    test5.setTestFunction(() => {
        // change the expiry time to 10 seconds
        const cacheParams: HashCacheParamsType<ObjectType> = {
            key   : cacheKey,
            hash  : hashKey,
            value : cacheValue,
            expire: 10,
        }
        let cacheRes = setHashCache(cacheParams);
        if (cacheRes.ok) {
            test5.assertEquals(cacheRes.ok, true);
            test5.assertEquals(cacheRes.value as ObjectType, cacheValue);
            test5.assertEquals(cacheRes.message as string, "task completed successfully");
            const getCacheParams: QueryHashCacheParamsType = {
                key : cacheKey,
                hash: hashKey,
            }
            const res = getHashCache<ObjectType>(getCacheParams);
            test5.assertEquals(res.ok, true);
            test5.assertEquals(res.value as ObjectType, cacheValue);
            test5.assertEquals(res.message as string, "task completed successfully");
        } else {
            test5.assertEquals(cacheRes.ok, false);
        }
    })
    const test5Res = test5.runTest();
    results.push(test5Res);

    const test6 = newTest({
        name: "should delete the cache and return nil/empty value",
    })
    test6.setTestFunction(() => {
        const delCacheParams: QueryHashCacheParamsType = {
            key : cacheKey,
            hash: hashKey,
        }
        let cacheRes = deleteHashCache<ObjectType>(delCacheParams);
        if (cacheRes.ok) {
            test6.assertEquals(cacheRes.ok, true);
            test6.assertEquals(cacheRes.message as string, "task completed successfully");
            const getCacheParams: QueryHashCacheParamsType = {
                key : cacheKey,
                hash: hashKey,
            }
            const res = getHashCache<ObjectType>(getCacheParams);
            test6.assertEquals(res.ok, false);
            test6.assertEquals(res.value === undefined, true);
            test6.assertEquals(res.message === "cache info does not exist" || res.message === "cache expired and deleted", true);
        } else {
            test6.assertEquals(cacheRes.ok, false);
        }
    })

    testResult(results);

})();
