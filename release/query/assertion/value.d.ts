import { ValueTest, valueMatcher, numberMatcher, stringMatcher, valueFilter } from '../interfaces';
export declare const eq: valueMatcher<any>;
export declare const gt: numberMatcher;
export declare const gte: numberMatcher;
export declare const lt: numberMatcher;
export declare const lte: numberMatcher;
export declare const match: stringMatcher;
export declare const getFilter: <T>(filter: valueFilter<T>) => ValueTest<any>;
