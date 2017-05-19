import { KioFragmentComponentStructure } from './classes/fragment/component.class';
import { KioContentComponentStructure } from './classes/node/component.class';
import { QueryableAnnotation, QueryableFragmentAnnotation, ListQuery } from '../query/interfaces';
export declare const isListQuery: <T>(other: any) => other is ListQuery<T>;
export declare const parseListQuery: <T>(query: T | ListQuery<T> | T[], sep?: string) => ListQuery<T>;
export declare const fromString: <T extends any>(source: string) => KioFragmentComponentStructure | KioContentComponentStructure<any>;
export declare const fromObject: <T extends any>(annotation: QueryableFragmentAnnotation | QueryableAnnotation<T>) => KioFragmentComponentStructure;
