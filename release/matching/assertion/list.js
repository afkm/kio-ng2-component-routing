import { getFilter, eq } from './value';
/**
 * requires {filter} to match each element of {otherValues}
 * all ( 'txt' ) ( [ 'txt' , 'txt' , 'txt' ] ) -> true
 * all ( 'txt' ) ( [ 'txt' , 'txt' , 'txt', 'txt' ] ) -> true
 * all ( 'txt' ) ( [ 'txt' , 'txt' , 'txt', 'src' ] ) -> true
 */
export var all = function (filter) { return function (otherValues) {
    if (otherValues.length === 0)
        return false;
    return otherValues.filter(getFilter(filter)).length === otherValues.length;
}; };
export var either = function (filterValues) { return function (values) {
    return filterValues.findIndex(function (filterValue) { return values.indexOf(filterValue) > -1; }) > -1;
}; };
/**
 * requires all values of {value} to be in {listValue}
 * @type {listMatcher<any>}
 * [ a, b ]  eq  [ b, a ]
 * [ a, b ]  eq  [ c, b, a ]
 * [ a, d ]  ne  [ c, b, a ]  => d missing
 */
export var contains = function (value, invert) {
    if (invert === void 0) { invert = false; }
    if (Array.isArray(value)) {
        return function (listValue) {
            var matchingValues = value.filter(function (valueItem) {
                return contains(valueItem, invert)(listValue);
            });
            return matchingValues.length === value.length;
        };
    }
    return function (listValue) {
        var idx = listValue.indexOf(value);
        return idx > -1 !== invert;
    };
};
/**
 * requires all values of {value} to be missing(!) in {listValue}
 * @type {listMatcher<any>}
 * [ a, b ]  ne  [ b, a ]
 * [ a, b ]  ne  [ c, b, a ]
 * [ a, b ]  eq  [ c, d ]
 */
export var containsNot = function (value) { return contains(value, true); };
/**
 * requires all values of {value} to be in {listValue} in the same order
 * [ a, b ] eq [ a, b ]
 * [ a, b ] ne [ a, b, c ]
 * [ a, b ] ne [ b, a ]
 * @type {listMatcher<any>}
 */
export var deepEqual = function (values) { return function (otherValues) {
    if (values.length !== otherValues.length)
        return false;
    var left = values.slice();
    var right = otherValues.slice();
    while (eq(left.pop())(right.pop())) {
        if (left.length === 0)
            return true;
    }
    return false;
    //return !values.find ( ( value , idx ) => idx !== otherValues.indexOf(value)  )
}; };
export function isLongish(other) {
    return ('length' in other);
}
/**
 * @param {[type]} otherValues.length [description]
 */
export var hasLength = function (length) {
    if ('number' === typeof length) {
        return function (other) {
            return other.length === length;
        };
    }
    return function (other) { return length(other.length); };
};
export var query = function (listQuery) {
    if (Array.isArray(listQuery)) {
        return query({ deepEqual: listQuery });
    }
    var assertions = [];
    if (isLongish(listQuery)) {
        if ('function' === typeof listQuery.length) {
            assertions.push(hasLength(listQuery.length));
        }
        assertions.push(hasLength(listQuery.length));
    }
    if (listQuery.either)
        assertions.push(either(listQuery.either));
    if (listQuery.contains)
        assertions.push(contains(listQuery.contains));
    if (listQuery.containsNot)
        assertions.push(containsNot(listQuery.containsNot));
    if (listQuery.all)
        assertions.push(all(listQuery.all));
    if (listQuery.deepEqual)
        assertions.push(deepEqual(listQuery.deepEqual));
    return function (list) {
        return assertions.length === assertions.filter(function (assertion) { return assertion(list) === true; }).length;
    };
};
//# sourceMappingURL=list.js.map