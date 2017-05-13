import { KioNode, KioChildContentType } from 'kio-ng2';
export interface MockedData {
    [key: string]: any;
}
export declare class ContentMockingService {
    constructor();
    getFixtureForComponent(componentName: string): any;
    fillContent(node: any): void;
    mockLoadNodeContent(node: any, params?: any): void;
    mockContentData<T extends KioChildContentType>(node: KioNode<T>, params?: MockedData): any;
}
