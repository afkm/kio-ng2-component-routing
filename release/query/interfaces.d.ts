import { KioCtnFragment, KioChildContentType } from 'kio-ng2';
export interface Predicate {
    (arg: any): boolean;
}
export interface Range<T> {
    min?: T;
    max?: T;
}
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
export interface numberMatcher {
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
}
export interface ComponentFixture {
    matching: any;
}
export declare type ChildQuery<T extends KioChildContentType> = QueryableAnnotation<T> | T;
export interface QueryableAnnotation<T extends KioChildContentType> {
    type: T;
    modifiers: ListQuery<string>;
}
export interface QueryableFragmentAnnotation extends QueryableAnnotation<KioCtnFragment> {
    type: KioCtnFragment;
    childTypes: ListQuery<QueryableAnnotation<KioChildContentType>>;
}
export declare const isQueryableAnnotation: <T extends any>(other: any) => other is QueryableAnnotation<T>;
export declare const isQueryableFragmentAnnotation: (other: any) => other is QueryableFragmentAnnotation;
