/**
 * @internal
 * @module ContentMocking
 * @preferred
 * content mocking module
 */
export * from './service/content-mocking.service';
export * from './content';
export declare module ContentMocking {
    /**
     * arg = ['txt.heading','src.image']
     * arg = ['txt.heading',['src.big-image','txt.paragraph']]
     */
    const mockNodeOfType: (nodeType: string, children?: string[]) => any;
    const mockType: (value: string | any[], children?: string[]) => any;
}
