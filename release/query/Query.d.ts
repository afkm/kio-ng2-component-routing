import { QueryableAnnotation, QueryableFragmentAnnotation } from './interfaces';
export declare const assertComponent: <T extends any>(queryableAnnotation: QueryableFragmentAnnotation | QueryableAnnotation<T>) => (node: any) => string[];
export declare const matchComponent: <T extends any>(componentAnnotation: QueryableFragmentAnnotation | QueryableAnnotation<T>) => (node: any) => boolean;
