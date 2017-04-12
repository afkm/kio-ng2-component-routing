export * from './service/content-mocking.service';
export * from './content';
/**
 * arg = ['txt.heading','src.image']
 * arg = ['txt.heading',['src.big-image','txt.paragraph']]
 */
export declare const mockNodeOfType: (nodeType: string, children?: string[]) => any;
export declare const mockType: (value: string | any[], children?: string[]) => any;
