import { KioComponentItem } from './ComponentsStore.class';
import { KioContent } from 'kio-ng2';
export declare const registerComponent: (item: KioComponentItem) => void;
export declare const getAllComponents: () => KioComponentItem[];
export declare const getComponentAt: (idx: number) => KioComponentItem;
export declare const getComponentByName: (componentName: string) => KioComponentItem;
export declare const getComponentIndexForNode: (node: KioContent) => number;
