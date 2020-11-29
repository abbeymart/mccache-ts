"use strict";
/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc: simpleCache testing
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mc_test_1 = require("../../mc-test");
var src_1 = require("../src");
// test data
var cacheValue = { firstName: 'Abi', lastName: 'Akindele', location: 'Toronto-Canada' }, cacheKey = JSON.stringify({ name: 'Tab1', location: 'Toronto' }), expiryTime = 5; // in seconds
// delay testing (async)
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mc_test_1.mcTest({
                    name: "should set and return valid cacheValue",
                    testFunc: function () {
                        var cacheRes = src_1.setCache(cacheKey, cacheValue, expiryTime);
                        if (cacheRes.ok) {
                            mc_test_1.assertEquals(cacheRes.ok, true);
                            mc_test_1.assertEquals(cacheRes.value, cacheValue);
                            mc_test_1.assertEquals(cacheRes.message, 'task completed successfully');
                            // get cache info
                            var res = src_1.getCache(cacheKey);
                            mc_test_1.assertEquals(res.ok, true);
                            mc_test_1.assertEquals(res.value, cacheValue);
                            mc_test_1.assertEquals(res.message, 'task completed successfully');
                        }
                        else {
                            mc_test_1.assertEquals(cacheRes.ok, false);
                        }
                    },
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, mc_test_1.mcTest({
                        name: "should clear the cache and return nil/empty value",
                        testFunc: function () {
                            var cacheRes = src_1.clearCache();
                            if (cacheRes.ok) {
                                mc_test_1.assertEquals(cacheRes.ok, true);
                                mc_test_1.assertEquals(cacheRes.message, 'task completed successfully');
                                // get cache info
                                var res = src_1.getCache(cacheKey);
                                mc_test_1.assertEquals(res.ok, false);
                                mc_test_1.assertEquals(res.message, 'cache info does not exist');
                            }
                            else {
                                mc_test_1.assertEquals(cacheRes.ok, false);
                            }
                        },
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, mc_test_1.mcTest({
                        name: "should set and return valid cacheValue -> before timeout/expiration)",
                        testFunc: function () {
                            // change the expiry time to 2 seconds
                            var cacheRes = src_1.setCache(cacheKey, cacheValue, 2);
                            if (cacheRes.ok) {
                                mc_test_1.assertEquals(cacheRes.ok, true);
                                mc_test_1.assertEquals(cacheRes.value, cacheValue);
                                mc_test_1.assertEquals(cacheRes.message, 'task completed successfully');
                                var res = src_1.getCache(cacheKey);
                                mc_test_1.assertEquals(res.ok, true);
                                mc_test_1.assertEquals(res.value, cacheValue);
                                mc_test_1.assertEquals(res.message, 'task completed successfully');
                            }
                            else {
                                mc_test_1.assertEquals(cacheRes.ok, false);
                            }
                        },
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, mc_test_1.mcTest({
                        name: "should return nil value after timeout/expiration",
                        testFunc: function () { return __awaiter(void 0, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, mc_test_1.delay(3000)];
                                    case 1:
                                        _a.sent();
                                        res = src_1.getCache(cacheKey);
                                        mc_test_1.assertEquals(res.ok, false);
                                        mc_test_1.assertEquals(res.value, undefined);
                                        mc_test_1.assertEquals(res.message, 'cache expired and deleted');
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, mc_test_1.mcTest({
                        name: "should set and return valid cacheValue (repeat prior to deleteCache testing",
                        testFunc: function () {
                            // change the expiry time to 10 seconds
                            var cacheRes = src_1.setCache(cacheKey, cacheValue, 10);
                            if (cacheRes.ok) {
                                mc_test_1.assertEquals(cacheRes.ok, true);
                                mc_test_1.assertEquals(cacheRes.value, cacheValue);
                                mc_test_1.assertEquals(cacheRes.message, 'task completed successfully');
                                var res = src_1.getCache(cacheKey);
                                mc_test_1.assertEquals(res.ok, true);
                                mc_test_1.assertEquals(res.value, cacheValue);
                                mc_test_1.assertEquals(res.message, 'task completed successfully');
                            }
                            else {
                                mc_test_1.assertEquals(cacheRes.ok, false);
                            }
                        },
                    })];
            case 5:
                _a.sent();
                return [4 /*yield*/, mc_test_1.mcTest({
                        name: "should delete the cache and return nil/empty value",
                        testFunc: function () {
                            var cacheRes = src_1.deleteCache(cacheKey);
                            if (cacheRes.ok) {
                                mc_test_1.assertEquals(cacheRes.ok, true);
                                mc_test_1.assertEquals(cacheRes.message, 'task completed successfully');
                                var res = src_1.getCache(cacheKey);
                                mc_test_1.assertEquals(res.ok, false);
                                mc_test_1.assertEquals(res.value, undefined);
                                mc_test_1.assertEquals(res.message, 'cache info does not exist');
                            }
                            else {
                                mc_test_1.assertEquals(cacheRes.ok, false);
                            }
                        },
                    })];
            case 6:
                _a.sent();
                return [4 /*yield*/, mc_test_1.postTestResult()];
            case 7:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
