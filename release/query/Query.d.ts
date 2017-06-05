import { KioNode } from 'kio-ng2';
import { QueryableAnnotation } from './interfaces';
export interface AnnotationNodeMatcher {
    (node: KioNode): boolean;
}
export interface AnnotationNodeAssertion {
    (node: KioNode): string[] | null;
}
export declare module Query {
    /**
     * @brief      component criteria assertion; returns assertion messages, if any issues occur
     *
     * @param      queryableAnnotation  component query annotation
     * @param      node                 kio node to assert
     *
     * @return     list of assertion messages or null
     */
    function assertComponent(queryableAnnotation: QueryableAnnotation): AnnotationNodeAssertion;
    function matchComponent(componentAnnotation: any): AnnotationNodeMatcher;
}
