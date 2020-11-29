"use strict";
/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-09
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc: hash cache (key-hash-value)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearHashCache = exports.deleteHashCache = exports.getHashCache = exports.setHashCache = void 0;
// Initialise cache object/dictionary (map)
var mcCache = new Map();
// secret keyCode for added security
var keyCode = 'mcconnect_20200320';
function setHashCache(key, hash, value, expire) {
    var _a, _b, _c, _d, _e;
    if (expire === void 0) { expire = 300; }
    // key and value: key:string, hash: string, value:Value, expire:time(seconds)
    try {
        if (!key || !hash || !value) {
            return {
                ok: false,
                message: 'cache key, hash and value are required',
            };
        }
        var cacheKey = key + keyCode;
        var hashKey = hash + keyCode;
        if (!mcCache.has(cacheKey)) {
            mcCache.set(cacheKey, new Map());
        }
        if (mcCache.has(cacheKey) && !((_a = mcCache.get(cacheKey)) === null || _a === void 0 ? void 0 : _a.has(hashKey))) {
            (_b = mcCache.get(cacheKey)) === null || _b === void 0 ? void 0 : _b.set(hashKey, {});
        }
        var hashValue = { value: value, expire: Date.now() + expire * 1000 };
        (_c = mcCache.get(cacheKey)) === null || _c === void 0 ? void 0 : _c.set(hashKey, hashValue);
        return {
            ok: true,
            message: 'task completed successfully',
            value: (_e = (_d = mcCache.get(cacheKey)) === null || _d === void 0 ? void 0 : _d.get(hashKey)) === null || _e === void 0 ? void 0 : _e.value,
        };
    }
    catch (e) {
        return {
            ok: false,
            message: e.message ? e.message : 'error creating/setting cache information',
        };
    }
}
exports.setHashCache = setHashCache;
function getHashCache(key, hash) {
    var _a, _b, _c, _d, _e;
    try {
        if (!key || !hash) {
            return {
                ok: false,
                message: 'key and hash-key are required',
            };
        }
        var cacheKey = key + keyCode;
        var hashKey = hash + keyCode;
        // get active (non-expired) cache content
        if (mcCache.has(cacheKey) && ((_a = mcCache.get(cacheKey)) === null || _a === void 0 ? void 0 : _a.has(hashKey))) {
            var cValue = (_b = mcCache.get(cacheKey)) === null || _b === void 0 ? void 0 : _b.get(hashKey);
            if (cValue && cValue.expire && cValue.expire > Date.now()) {
                return {
                    ok: true,
                    message: 'task completed successfully',
                    value: (_d = (_c = mcCache.get(cacheKey)) === null || _c === void 0 ? void 0 : _c.get(hashKey)) === null || _d === void 0 ? void 0 : _d.value,
                };
            }
            else {
                // delete expired cache
                (_e = mcCache.get(cacheKey)) === null || _e === void 0 ? void 0 : _e.delete((hashKey));
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
exports.getHashCache = getHashCache;
function deleteHashCache(key, hash, by) {
    var _a, _b;
    if (by === void 0) { by = "hash"; }
    try {
        if ((!key || !hash) && by === 'hash') {
            return {
                ok: false,
                message: 'key and hash-key are required',
            };
        }
        var cacheKey = key + keyCode;
        var hashKey = hash + keyCode;
        if (key && by === 'key' && mcCache.has(cacheKey)) {
            mcCache.delete(cacheKey);
            return {
                ok: true,
                message: 'task completed successfully',
            };
            // key != "" and hash != "" and by == "hash" and mcCache.hasKey(cacheKey) and mcCache[cacheKey].hasKey(hashKey)
        }
        else if (key && hash && by === 'hash' && ((_a = mcCache.get(cacheKey)) === null || _a === void 0 ? void 0 : _a.has(hashKey))) {
            (_b = mcCache.get(cacheKey)) === null || _b === void 0 ? void 0 : _b.delete(hashKey);
            return {
                ok: true,
                message: 'task completed successfully',
            };
        }
        else {
            return {
                ok: false,
                message: 'task could not be completed due to incomplete inputs',
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
exports.deleteHashCache = deleteHashCache;
function clearHashCache() {
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
            message: e.message ? e.message : 'error clearing the cache',
        };
    }
}
exports.clearHashCache = clearHashCache;
