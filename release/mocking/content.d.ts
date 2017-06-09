import { KioContentModel } from 'kio-ng2';
import { MockingParams } from './args';
export declare const cuid: (...params: any[]) => string;
export declare const mockFragment: (children: any[], modifiers?: string[]) => any;
export declare const mockContentFromString: (selector: string) => KioContentModel;
export declare const mockContent: (value: string, modifiers?: string[]) => KioContentModel;
export declare const mockContentWithArgs: (contentType: "src" | "txt", modifiers: string[], args: MockingParams) => KioContentModel;
