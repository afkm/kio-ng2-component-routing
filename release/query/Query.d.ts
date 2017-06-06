import { KioNode } from 'kio-ng2';
import { QueryableAnnotation, QueryableFragmentAnnotation } from './interfaces';
export interface AnnotationNodeMatcher {
    (node: KioNode): boolean;
}
export interface AnnotationNodeAssertion {
    (node: KioNode): string[] | null;
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
