import { KioFragmentComponentStructure } from './classes/fragment/component.class';
import { KioContentComponentStructure } from './classes/node/component.class';
import { QueryableAnnotation, QueryableFragmentAnnotation, ListQuery } from '../query/interfaces';
import { KioChildContentType, KioPrimitiveContentType, KioNodeType } from 'kio-ng2';
export declare const isListQuery: <T>(other: any) => other is ListQuery<T>;
export declare const parseListQuery: <T>(query: T | ListQuery<T> | T[], sep?: string) => ListQuery<T>;
export declare const fromString: <T extends KioNodeType>(source: string) => KioFragmentComponentStructure | KioContentComponentStructure<KioPrimitiveContentType>;
export declare const fromObject: <T extends KioChildContentType>(annotation: QueryableFragmentAnnotation | QueryableAnnotation<T>) => KioFragmentComponentStructure;
