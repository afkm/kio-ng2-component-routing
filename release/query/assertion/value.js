"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eq = (value) => {
    if (value && 'function' === typeof value.test)
        return value.test.bind(value);
    return (otherValue) => value === otherValue;
};
exports.gt = (value) => (otherValue) => otherValue > value;
exports.gte = (value) => (otherValue) => otherValue >= value;
exports.lt = (value) => (otherValue) => otherValue < value;
exports.lte = (value) => (otherValue) => otherValue <= value;
exports.match = (value) => {
    if ('string' === typeof value) {
        return exports.eq(value);
    }
    return value.test.bind(value);
};
exports.getFilter = (filter) => {
    if ('function' !== typeof filter) {
        return exports.eq(filter);
    }
    return filter;
};
//# sourceMappingURL=value.js.map