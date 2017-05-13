import { KioContentModel, KioFragmentModel, KioNestedContentType, KioPrimitiveContentType, KioNodeType } from 'kio-ng2';
export interface MockSchema<T extends KioNodeType> {
    type: T;
    modifiers: string[];
    typeParams: string;
}
export declare const cuid: (...params: any[]) => string;
export declare const mockFragment: (children: any[], modifiers?: string[]) => KioFragmentModel<KioNodeType.fragment>;
export declare const mockContentFromString: (selector: string) => KioContentModel<KioPrimitiveContentType>;
export declare const mockPrimitive: <T extends KioPrimitiveContentType>(type: T, modifiers: string[], cuid: string, parent?: KioFragmentModel<KioNestedContentType>) => KioContentModel<T>;
export declare const mockContent: <T extends KioPrimitiveContentType>(value: string | T, modifiers?: string[], parent?: KioFragmentModel<KioNestedContentType>) => KioContentModel<T>;
