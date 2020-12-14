/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-09
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc: hash cache (key-hash-value)
 */

// types
import { ValueType, CacheValueType, HashCacheValueType, CacheResponseType } from "./types";

// Initialise cache object/dictionary (map)
let mcCache = new Map<string, HashCacheValueType>();

// secret keyCode for added security
const keyCode = "mcconnect_20200320";

export function setHashCache(key: string, hash: string, value: ValueType, expire: number = 300): CacheResponseType {
    // key and value: key:string, hash: string, value:Value, expire:time(seconds)
    try {
        if (!key || !hash || !value) {
            return {
                ok     : false,
                message: "cache key, hash and value are required",
            }
        }
        const cacheKey = key + keyCode;
        const hashKey = hash + keyCode;

        if (!mcCache.has(cacheKey)) {
            mcCache.set(cacheKey, new Map<string, CacheValueType>());
        }
        if (mcCache.has(cacheKey) && !mcCache.get(cacheKey)?.has(hashKey)) {
            mcCache.get(cacheKey)?.set(hashKey, {});
        }
        let hashValue = {value: value, expire: Date.now() + expire * 1000};
        mcCache.get(cacheKey)?.set(hashKey, hashValue);
        return {
            ok     : true,
            message: "task completed successfully",
            value  : mcCache.get(cacheKey)?.get(hashKey)?.value,
        }
    } catch (e) {
        return {
            ok     : false,
            message: e.message ? e.message : "error creating/setting cache information",
        }
    }
}

export function getHashCache(key: string, hash: string): CacheResponseType {
    try {
        if (!key || !hash) {
            return {
                ok     : false,
                message: "key and hash-key are required",
            }
        }
        const cacheKey = key + keyCode;
        const hashKey = hash + keyCode;
        // get active (non-expired) cache content
        if (mcCache.has(cacheKey) && mcCache.get(cacheKey)?.has(hashKey)) {
            let cValue = mcCache.get(cacheKey)?.get(hashKey);
            if (cValue && cValue.expire && cValue.expire > Date.now()) {
                return {
                    ok     : true,
                    message: "task completed successfully",
                    value  : mcCache.get(cacheKey)?.get(hashKey)?.value,
                }
            } else {
                // delete expired cache
                mcCache.get(cacheKey)?.delete((hashKey));
                return {
                    ok     : false,
                    message: "cache expired and deleted",
                }
            }
        } else {
            return {
                ok     : false,
                message: "cache info does not exist",
            }
        }
    } catch (e) {
        return {
            ok     : false,
            message: e.message ? e.message : "error fetching cache information",
        }
    }
}

export function deleteHashCache(key: string, hash: string, by: string = "hash"): CacheResponseType {
    try {

        if ((!key || !hash) && by === "hash") {
            return {
                ok     : false,
                message: "key and hash-key are required",
            }
        }
        const cacheKey = key + keyCode;
        const hashKey = hash + keyCode;
        if (key && by === "key" && mcCache.has(cacheKey)) {
            mcCache.delete(cacheKey);
            return {
                ok     : true,
                message: "task completed successfully",
            }
            // key != "" and hash != "" and by == "hash" and mcCache.hasKey(cacheKey) and mcCache[cacheKey].hasKey(hashKey)
        } else if (key && hash && by === "hash" && mcCache.get(cacheKey)?.has(hashKey)) {
            mcCache.get(cacheKey)?.delete(hashKey);
            return {
                ok     : true,
                message: "task completed successfully",
            }
        } else {
            return {
                ok     : false,
                message: "task could not be completed due to incomplete inputs",
            }
        }
    } catch (e) {
        return {
            ok     : false,
            message: e.message ? e.message : "error deleting cache information",
        }
    }
}

export function clearHashCache(): CacheResponseType {
    try {
        // clear the cache object/dictionary (map)
        mcCache.clear();
        return {
            ok     : true,
            message: "task completed successfully",
        }
    } catch (e) {
        return {
            ok     : false,
            message: e.message ? e.message : "error clearing the cache",
        }
    }
}
