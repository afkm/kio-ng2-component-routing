import { KioFragmentModel, KioContentModel, KioNode } from 'kio-ng2-data';
import { ContentMockingService } from './service/content-mocking.service';
export declare const Mocking: {
    mockContent: (value: string, modifiers?: string[]) => KioContentModel;
    mockContentFromString: (selector: string) => KioContentModel;
    mockContentWithArgs: <T extends {}>(nodeType: string, data: T) => {
        cuid: string;
        locale: string;
        type: string;
        modifiers: string[];
    };
    mockFragment: (children: any[], modifiers?: string[]) => KioFragmentModel;
    mockNodeOfType: (nodeType: string, children?: string[]) => KioNode;
    mockType: (value: string | any[], children?: string[]) => KioNode;
    cuid: (...params: string[]) => string;
    ContentMockingService: typeof ContentMockingService;
};
