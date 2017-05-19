import { KioContentModel, KioFragmentModel, KioNestedContentType, KioCtnFragment, KioPrimitiveContentType, KioCtnSrc, KioCtnTxt, KioNodeType } from 'kio-ng2';
export interface MockSchema<T extends KioNodeType> {
    type: T;
    cuid?: string;
    modifiers?: string[];
    typeParams?: string;
}
export declare type MockedItem = MockSchema<KioNodeType> | KioContentModel<KioPrimitiveContentType> | KioFragmentModel<KioCtnFragment> | string;
export declare function isMockSchema<T extends KioNodeType>(other: any): other is MockSchema<T>;
export declare const cuid: (...params: any[]) => string;
export declare const mockFragment: (children: any[], modifiers?: string[]) => any;
export declare const mockContentFromString: (selector: string) => any;
export declare const mockPrimitive: <T extends any>(type: T, modifiers: string[], cuid: string, parent?: any) => any;
export declare function mockContent<T extends KioCtnTxt | KioCtnSrc>(value: string | T, modifiers?: string[], parent?: KioFragmentModel<KioNestedContentType>): KioContentModel<T>;
