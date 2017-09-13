export var eq = function (value) {
    /*if ( value && 'function' === typeof value.test )
      return value.test.bind ( value )*/
    return function matcher(otherValue) {
        if (typeof value !== typeof otherValue)
            return false;
        return value === otherValue;
    };
};
export var gt = function (value) { return function (otherValue) { return otherValue > value; }; };
export var gte = function (value) { return function (otherValue) { return otherValue >= value; }; };
export var lt = function (value) { return function (otherValue) { return otherValue < value; }; };
export var lte = function (value) { return function (otherValue) { return otherValue <= value; }; };
export var match = function (value) {
    if ('string' === typeof value) {
        return eq(value);
    }
    return value.test.bind(value);
};
export var isValueFilter = function (other) {
    return ('function' === typeof other
        &&
            other.length === 1);
};
export var isValueMatcher = function (other) {
    return ('function' === typeof other
        &&
            other.length === 1);
};
export function getFilter(filter) {
    if (isValueFilter(filter)) {
        return filter;
    }
    return eq(filter);
}
//# sourceMappingURL=value.js.map