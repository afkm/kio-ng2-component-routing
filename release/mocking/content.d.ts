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
export declare const mockFragment: (children: MockedItem[], modifiers?: string[]) => KioFragmentModel<KioNodeType.fragment>;
export declare const mockContentFromString: (selector: string) => KioContentModel<KioPrimitiveContentType>;
export declare const mockPrimitive: <T extends KioPrimitiveContentType>(type: T, modifiers: string[], cuid: string, parent?: KioFragmentModel<KioNestedContentType>) => KioContentModel<T>;
export declare function mockContent<T extends KioCtnTxt | KioCtnSrc>(value: string | T, modifiers?: string[], parent?: KioFragmentModel<KioNestedContentType>): KioContentModel<T>;
