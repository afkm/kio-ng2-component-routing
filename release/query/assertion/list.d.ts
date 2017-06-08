import { ListQuery, ValueTest, numberMatcher, listMatcher } from '../interfaces';
/**
 * requires {filter} to match each element of {otherValues}
 * all ( 'txt' ) ( [ 'txt' , 'txt' , 'txt' ] ) -> true
 * all ( 'txt' ) ( [ 'txt' , 'txt' , 'txt', 'txt' ] ) -> true
 * all ( 'txt' ) ( [ 'txt' , 'txt' , 'txt', 'src' ] ) -> true
 */
export declare const all: listMatcher<any>;
export declare const either: <T>(filterValues: T[]) => (values: T[]) => boolean;
/**
 * requires all values of {value} to be in {listValue}
 * @type {listMatcher<any>}
 * [ a, b ]  eq  [ b, a ]
 * [ a, b ]  eq  [ c, b, a ]
 * [ a, d ]  ne  [ c, b, a ]  => d missing
 */
export declare const contains: listMatcher<any>;
/**
 * requires all values of {value} to be missing(!) in {listValue}
 * @type {listMatcher<any>}
 * [ a, b ]  ne  [ b, a ]
 * [ a, b ]  ne  [ c, b, a ]
 * [ a, b ]  eq  [ c, d ]
 */
export declare const containsNot: listMatcher<any>;
/**
 * requires all values of {value} to be in {listValue} in the same order
 * [ a, b ] eq [ a, b ]
 * [ a, b ] ne [ a, b, c ]
 * [ a, b ] ne [ b, a ]
 * @type {listMatcher<any>}
 */
export declare const deepEqual: listMatcher<any>;
/**
 * @param {[type]} otherValues.length [description]
 */
export declare const hasLength: (length: numberMatcher) => (otherValues: any[]) => ValueTest<number>;
export declare const query: (listQuery: any[] | ListQuery<any>) => any;
