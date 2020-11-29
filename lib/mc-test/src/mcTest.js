"use strict";
/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: testing module functions
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
exports.postTestResult = exports.mcTest = exports.assertNotStrictEquals = exports.assertStrictEquals = exports.assertNotEquals = exports.assertEquals = exports.delay = void 0;
// Test counts
var unitTestPassed = 0;
var unitTestFailed = 0;
var passedTest = 0;
var failedTest = 0;
// Helper functions | TODO: include feature to write the test result/report to an output file
// delay/pause testing task
function delay(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
exports.delay = delay;
// assert equals
function assertEquals(expr, result, message) {
    try {
        if (expr === result) {
            console.log('Passed');
            unitTestPassed += 1;
            passedTest += 1;
            return 'Passed';
        }
        else {
            console.error("Failed: " + message + " =>  Expected " + result + ", Got " + expr);
            unitTestFailed += 1;
            failedTest += 1;
            return "Failed: " + message + " =>  Expected " + result + ", Got " + expr;
        }
    }
    catch (e) {
        console.error(e.message);
        console.log('======================');
        console.dir(e);
        unitTestFailed += 1;
        failedTest += 1;
        return '';
    }
}
exports.assertEquals = assertEquals;
// assert not equals
function assertNotEquals(expr, result, message) {
    try {
        if (expr !== result) {
            console.log('Passed');
            unitTestPassed += 1;
            passedTest += 1;
            return 'Passed';
        }
        else {
            console.error("Failed: " + message + " =>  Expected " + result + ", Got " + expr);
            unitTestFailed += 1;
            failedTest += 1;
            return "Failed: " + message + " =>  Expected " + result + ", Got " + expr;
        }
    }
    catch (e) {
        console.error(e.message);
        console.log('======================');
        console.dir(e);
        unitTestFailed += 1;
        failedTest += 1;
        return '';
    }
}
exports.assertNotEquals = assertNotEquals;
// assert strict equals => deep equality check through stringified values
function assertStrictEquals(expr, result, message) {
    try {
        if (expr.toString() === result.toString()) {
            console.log('Passed');
            unitTestPassed += 1;
            passedTest += 1;
            return 'Passed';
        }
        else {
            console.error("Failed: " + message + " =>  Expected " + result + ", Got " + expr);
            unitTestFailed += 1;
            failedTest += 1;
            return "Failed: " + message + " =>  Expected " + result + ", Got " + expr;
        }
    }
    catch (e) {
        console.error(e.message);
        console.log('======================');
        console.dir(e);
        unitTestFailed += 1;
        failedTest += 1;
        return '';
    }
}
exports.assertStrictEquals = assertStrictEquals;
// assert not strict equals => deep equality check through stringified values
function assertNotStrictEquals(expr, result, message) {
    try {
        if (expr.toString() !== result.toString()) {
            console.log('Passed');
            unitTestPassed += 1;
            passedTest += 1;
            return 'Passed';
        }
        else {
            console.error("Failed: " + message + " =>  Expected " + result + ", Got " + expr);
            unitTestFailed += 1;
            failedTest += 1;
            return "Failed: " + message + " =>  Expected " + result + ", Got " + expr;
        }
    }
    catch (e) {
        console.error(e.message);
        console.log('======================');
        console.dir(e);
        unitTestFailed += 1;
        failedTest += 1;
        return '';
    }
}
exports.assertNotStrictEquals = assertNotStrictEquals;
// TODO: test Expr-includes/excludes-result
// Access params: test-name, test-functions, test-options
function mcTest(options) {
    return __awaiter(this, void 0, void 0, function () {
        var testName, testFunction, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 6]);
                    testName = options && options.name ? options === null || options === void 0 ? void 0 : options.name : 'Unknown';
                    testFunction = options && options.testFunc ? options === null || options === void 0 ? void 0 : options.testFunc : null;
                    console.log("Running Test: " + testName);
                    console.log('======================================================');
                    if (!testFunction) return [3 /*break*/, 2];
                    return [4 /*yield*/, testFunction()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    console.error('No test task/function specified - Test skipped!!!');
                    _a.label = 3;
                case 3: return [3 /*break*/, 6];
                case 4:
                    e_1 = _a.sent();
                    console.error(e_1.message);
                    console.log('=====================================');
                    console.dir(e_1);
                    return [3 /*break*/, 6];
                case 5:
                    console.log("Summary for Test: " + (options && options.name ? options === null || options === void 0 ? void 0 : options.name : 'Unknown') + ": ");
                    console.log('Test Passed: ', unitTestPassed);
                    console.error('Test Failed: ', unitTestFailed);
                    console.log('Total Test: ', unitTestPassed + unitTestFailed);
                    // Reset unit test counts
                    unitTestPassed = 0;
                    unitTestFailed = 0;
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.mcTest = mcTest;
function postTestResult() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('============================');
            console.log('All Tests Summary Stats:');
            console.log('============================');
            console.log('Test Passed: ', passedTest);
            console.error('Test Failed: ', failedTest);
            console.log('Total Test: ', passedTest + failedTest);
            // reset test counts
            passedTest = 0;
            failedTest = 0;
            console.log('***** Test Completed *****');
            return [2 /*return*/];
        });
    });
}
exports.postTestResult = postTestResult;
