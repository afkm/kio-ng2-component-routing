import { KioNode } from 'kio-ng2-data';
/**
 * arg = ['txt.heading','src.image']
 * arg = ['txt.heading',['src.big-image','txt.paragraph']]
 */
export declare const mockNodeOfType: (nodeType: string, children?: string[]) => KioNode;
export declare const mockType: (value: string | any[], children?: string[]) => KioNode;
