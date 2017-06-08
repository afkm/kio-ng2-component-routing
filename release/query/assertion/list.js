"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const value_1 = require("./value");
/**
 * requires {filter} to match each element of {otherValues}
 * all ( 'txt' ) ( [ 'txt' , 'txt' , 'txt' ] ) -> true
 * all ( 'txt' ) ( [ 'txt' , 'txt' , 'txt', 'txt' ] ) -> true
 * all ( 'txt' ) ( [ 'txt' , 'txt' , 'txt', 'src' ] ) -> true
 */
exports.all = (filter) => (otherValues) => {
    if (otherValues.length === 0)
        return false;
    return otherValues.filter(value_1.getFilter(filter)).length === otherValues.length;
};
/**
 * requires all values of {value} to be in {listValue}
 * @type {listMatcher<any>}
 * [ a, b ]  eq  [ b, a ]
 * [ a, b ]  eq  [ c, b, a ]
 * [ a, d ]  ne  [ c, b, a ]  => d missing
 */
exports.contains = (value, invert = false) => {
    if (Array.isArray(value)) {
        return (listValue) => {
            const matchingValues = value.filter((valueItem) => {
                return exports.contains(valueItem)(listValue);
            });
            return matchingValues.length === value.length;
        };
    }
    return (listValue) => {
        return listValue.indexOf(value) > -1 !== invert;
    };
};
/**
 * requires all values of {value} to be missing(!) in {listValue}
 * @type {listMatcher<any>}
 * [ a, b ]  ne  [ b, a ]
 * [ a, b ]  ne  [ c, b, a ]
 * [ a, b ]  eq  [ c, d ]
 */
exports.containsNot = (value) => exports.contains(value, true);
/**
 * requires all values of {value} to be in {listValue} in the same order
 * [ a, b ] eq [ a, b ]
 * [ a, b ] ne [ a, b, c ]
 * [ a, b ] ne [ b, a ]
 * @type {listMatcher<any>}
 */
exports.deepEqual = (values) => (otherValues) => {
    if (values.length !== otherValues.length)
        return false;
    const left = values.slice();
    const right = otherValues.slice();
    while (value_1.eq(left.pop())(right.pop())) {
        if (left.length === 0)
            return true;
    }
    return false;
    //return !values.find ( ( value , idx ) => idx !== otherValues.indexOf(value)  )
};
/**
 * @param {[type]} otherValues.length [description]
 */
exports.hasLength = (length) => (otherValues) => length(otherValues.length);
exports.query = (listQuery) => {
    if (Array.isArray(listQuery)) {
        return exports.query({ deepEqual: listQuery });
    }
    const assertions = [];
    if (listQuery.length)
        assertions.push(exports.hasLength(value_1.getFilter(listQuery.length)));
    if (listQuery.contains)
        assertions.push(exports.contains(listQuery.contains));
    if (listQuery.containsNot)
        assertions.push(exports.containsNot(listQuery.containsNot));
    if (listQuery.all)
        assertions.push(exports.all(listQuery.all));
    if (listQuery.deepEqual)
        assertions.push(exports.deepEqual(listQuery.deepEqual));
    return (list) => {
        return assertions.length === assertions.filter(assertion => assertion(list) === true).length;
    };
};
//# sourceMappingURL=list.js.map