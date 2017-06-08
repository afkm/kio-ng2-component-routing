export interface Predicate {
    (arg: any): boolean;
}
export interface Longish<T> {
    length: T;
}
export interface Range<T> {
    min?: T;
    max?: T;
}
export declare type ValueParam<T> = T | T[];
export declare type MatchParam<T> = T | ValueTest<T>;
export declare type ListValue = any[];
export interface ValueQuery<T> {
    eq?: T;
    not?: T;
}
export interface NumberQuery extends ValueQuery<number> {
    gt?: number;
    lt?: number;
    gte?: number;
    lte?: number;
}
export interface ValueTest<T> {
    (value: T): boolean;
}
export interface valueMatcher<T> {
    (value: T): ValueTest<T>;
}
export interface numberMatcher extends valueMatcher<number> {
    (value: number): ValueTest<number>;
}
export interface stringMatcher extends valueMatcher<string | RegExp> {
}
export interface listMatcher<T> {
    (value: T, invert?: boolean): ValueTest<T[]>;
}
export declare type valueFilter<T> = T | ValueTest<T> | T[];
export interface ListQuery<T> extends ValueQuery<ListValue> {
    length?: numberMatcher | number;
    contains?: valueFilter<T>;
    containsNot?: valueFilter<T>;
    all?: valueFilter<T>;
    deepEqual?: T[];
    either?: T[];
}
export interface ComponentFixture {
    matching: any;
}
export interface QueryableAnnotation {
    type: string;
    modifiers?: ListQuery<string>;
    childTypes?: ListQuery<string>;
    fixture?: ComponentFixture;
}
