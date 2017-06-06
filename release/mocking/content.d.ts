/**
 * @module ContentMocking
 */
import { KioContentModel, KioNodeType } from 'kio-ng2';
export declare const cuid: (...params: any[]) => string;
export declare const mockFragment: (children: any[], modifiers?: string[]) => any;
export declare const mockContentFromString: (selector: string) => KioContentModel<any>;
export declare const mockContent: <T extends KioNodeType>(value: string, modifiers?: string[]) => KioContentModel<any>;
