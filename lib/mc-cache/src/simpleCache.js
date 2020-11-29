"use strict";
/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-09
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc: simple cache (key-value)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCache = exports.deleteCache = exports.getCache = exports.setCache = void 0;
// Initialise cache object/dictionary (map)
var mcCache = new Map();
// secret keyCode for added security
var keyCode = 'mcconnect_20200320';
function setCache(key, value, expire) {
    var _a;
    if (expire === void 0) { expire = 300; }
    // key and value: key:string, value:Value, expire:time(seconds)
    try {
        if (!key || !value) {
            return {
                ok: false,
                message: 'cache key and value are required',
            };
        }
        var cacheKey = key + keyCode;
        mcCache.set(cacheKey, { value: value, expire: Date.now() + expire * 1000 });
        return {
            ok: true,
            message: 'task completed successfully',
            value: (_a = mcCache.get(cacheKey)) === null || _a === void 0 ? void 0 : _a.value,
        };
    }
    catch (e) {
        return {
            ok: false,
            message: e.message ? e.message : 'error creating/setting cache information',
        };
    }
}
exports.setCache = setCache;
function getCache(key) {
    try {
        if (!key) {
            return {
                ok: false,
                message: 'cache key is required',
            };
        }
        var cacheKey = key + keyCode;
        if (mcCache.has(cacheKey)) {
            var cValue = mcCache.get(cacheKey);
            if (cValue && cValue.expire && cValue.expire > Date.now()) {
                return {
                    ok: true,
                    message: 'task completed successfully',
                    value: cValue.value,
                };
            }
            else {
                // delete expired cache
                mcCache.delete(cacheKey);
                return {
                    ok: false,
                    message: 'cache expired and deleted',
                };
            }
        }
        else {
            return {
                ok: false,
                message: 'cache info does not exist',
            };
        }
    }
    catch (e) {
        return {
            ok: false,
            message: e.message ? e.message : 'error fetching cache information',
        };
    }
}
exports.getCache = getCache;
function deleteCache(key) {
    try {
        if (!key) {
            return {
                ok: false,
                message: 'cache key is required',
            };
        }
        var cacheKey = key + keyCode;
        if (mcCache.has(cacheKey)) {
            mcCache.delete(cacheKey);
            return {
                ok: true,
                message: 'task completed successfully',
            };
        }
        else {
            return {
                ok: false,
                message: 'task not completed, cache-key not found',
            };
        }
    }
    catch (e) {
        return {
            ok: false,
            message: e.message ? e.message : 'error deleting cache information',
        };
    }
}
exports.deleteCache = deleteCache;
function clearCache() {
    try {
        // clear the cache object/dictionary (map)
        mcCache.clear();
        return {
            ok: true,
            message: 'task completed successfully',
        };
    }
    catch (e) {
        return {
            ok: false,
            message: e.message ? e.message : 'error clearing cache',
        };
    }
}
exports.clearCache = clearCache;
