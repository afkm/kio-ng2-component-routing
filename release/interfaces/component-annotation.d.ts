import { ContentType, Annotation } from './annotation';
export interface ComponentAnnotation<T extends ContentType> {
    [key: string]: any;
    queryable: Annotation<T>;
}
