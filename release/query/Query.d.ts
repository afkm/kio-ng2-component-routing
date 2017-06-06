import { KioNode } from 'kio-ng2';
import { KioContentType } from 'kio-ng2';
import { QueryableAnnotation, QueryableFragmentAnnotation } from './interfaces';
export interface AnnotationNodeMatcher {
    <T extends KioContentType>(node: KioNode<T>): boolean;
}
export interface AnnotationNodeAssertion {
    <T extends KioContentType>(node: KioNode<T>): string[] | null;
}
export declare type ComponentMatchingArgument = QueryableFragmentAnnotation | QueryableAnnotation;
export declare module Query {
    /**
     * @brief      component criteria assertion; returns assertion messages, if any issues occur
     *
     * @param      queryableAnnotation  component query annotation
     * @param      node                 kio node to assert
     *
     * @return     list of assertion messages or null
     */
    function assertComponent(queryableAnnotation: ComponentMatchingArgument): AnnotationNodeAssertion;
    function matchComponent(componentAnnotation: any): AnnotationNodeMatcher;
}
