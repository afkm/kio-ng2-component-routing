"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eq = function (value) {
    if (value && 'function' === typeof value.test)
        return value.test.bind(value);
    return function (otherValue) { return value === otherValue; };
};
exports.gt = function (value) { return function (otherValue) { return otherValue > value; }; };
exports.gte = function (value) { return function (otherValue) { return otherValue >= value; }; };
exports.lt = function (value) { return function (otherValue) { return otherValue < value; }; };
exports.lte = function (value) { return function (otherValue) { return otherValue <= value; }; };
exports.match = function (value) {
    if ('string' === typeof value) {
        return exports.eq(value);
    }
    return value.test.bind(value);
};
exports.getFilter = function (filter) {
    if ('function' !== typeof filter) {
        return exports.eq(filter);
    }
    return filter;
};
//# sourceMappingURL=value.js.map