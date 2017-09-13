import { ListQuery } from './list-query';
export declare type DataType = 'src' | 'txt';
export declare type ContentType = 'fragment' | DataType;
export interface Annotation<T extends ContentType> {
    type: T;
    modifiers: ListQuery<string>;
    [key: string]: any;
}
export interface FragmentAnnotation extends Annotation<'fragment'> {
    childTypes: ListQuery<string>;
}
export interface ContentAnnotation extends Annotation<DataType> {
}
