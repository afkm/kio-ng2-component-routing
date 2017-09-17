import { KioContentModel } from 'kio-ng2-data';
export declare const mockContentFromString: (selector: string) => KioContentModel;
export declare const mockContentWithArgs: <T extends {}>(nodeType: string, data: T) => {
    cuid: string;
    locale: string;
    type: string;
    modifiers: string[];
};
export declare const mockContent: (value: string, modifiers?: string[]) => KioContentModel;
