import { KioComponentItem, IndexSymbol } from './interfaces';
import { KioContent, KioPrimitiveContentType } from 'kio-ng2';
import { BasicStore } from './BasicStore.class';
export declare class ComponentsStore extends BasicStore {
    registerIndex(indexName: string, indexSymbols: IndexSymbol[]): void;
    registerComponent(item: KioComponentItem): void;
    getAllComponents(): KioComponentItem[];
    getComponentAt(idx: number): KioComponentItem;
    getComponentByName(componentName: string): KioComponentItem;
    getComponentIndexForNode<T extends KioPrimitiveContentType>(node: KioContent<T>): number;
}
