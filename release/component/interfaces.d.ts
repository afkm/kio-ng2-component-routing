import { QueryableAnnotation, QueryableFragmentAnnotation } from '../query/interfaces';
export interface ComponentStructure extends QueryableAnnotation {
}
export declare const isComponentStructure: (other: any) => other is ComponentStructure;
export interface ComponentFragmentStructure extends QueryableFragmentAnnotation {
}
export declare const isComponentFragmentStructure: (other: any) => other is ComponentFragmentStructure;
export interface INamedAnnotation {
    name: string;
}
export declare type NamedComponentStructure = INamedAnnotation & ComponentStructure;
export declare type NamedFragmentComponentStructure = INamedAnnotation & ComponentFragmentStructure;
export declare const isNamedAnnotation: (other: any) => other is INamedAnnotation;
export declare const isNamedComponentStructure: (other: any) => other is NamedComponentStructure;
export declare const isNamedFragmentComponentStructure: (other: any) => other is NamedFragmentComponentStructure;
export declare type NamedComponent = NamedComponentStructure | NamedComponentStructure | NamedFragmentComponentStructure;
export declare const isNamedComponent: (other: any) => other is NamedComponent;
