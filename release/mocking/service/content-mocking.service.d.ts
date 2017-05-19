import { KioNode } from 'kio-ng2';
export interface MockedData {
    [key: string]: any;
}
export declare class ContentMockingService {
    constructor();
    getFixtureForComponent(componentName: string): any;
    fillContent(node: any): void;
    mockLoadNodeContent(node: any, params?: any): void;
    mockContentData(node: KioNode, params?: MockedData): any;
}
