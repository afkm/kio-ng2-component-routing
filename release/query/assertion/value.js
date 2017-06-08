"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eq = function (value) {
    /*if ( value && 'function' === typeof value.test )
      return value.test.bind ( value )*/
    return function matcher(otherValue) {
        if (typeof value !== typeof otherValue)
            return false;
        return value === otherValue;
    };
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
exports.isValueFilter = function (other) {
    return ('function' === typeof other
        &&
            other.length === 1);
};
exports.isValueMatcher = function (other) {
    return ('function' === typeof other
        &&
            other.length === 1);
};
function getFilter(filter) {
    if (exports.isValueFilter(filter)) {
        return filter;
    }
    return exports.eq(filter);
}
exports.getFilter = getFilter;
//# sourceMappingURL=value.js.map