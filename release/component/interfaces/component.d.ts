import { KioChildContentType } from 'kio-ng2';
import { QueryableAnnotation, QueryableFragmentAnnotation } from '../../query/interfaces';
import { ListQuery } from '../../query/interfaces';
export interface ComponentStructure<T extends KioChildContentType> extends QueryableAnnotation<T> {
}
export declare const isComponentStructure: <T extends any>(other: any) => other is ComponentStructure<T>;
export interface ComponentFragmentStructure extends QueryableFragmentAnnotation {
    childTypes: ListQuery<ComponentStructure<KioChildContentType>>;
}
export declare const isComponentFragmentStructure: (other: any) => other is ComponentFragmentStructure;
