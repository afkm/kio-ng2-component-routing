import { KioComponentItem, ItemIterator, ItemFilter, ItemMapper, IndexSymbol } from './interfaces';
import { KioNode, KioChildContentType } from 'kio-ng2';
export declare class ComponentsStore {
    items: KioComponentItem[];
    /**
     * register kio component for component routing
     * @param {KioComponentItem} item
     */
    addItem(item: KioComponentItem): void;
    addSymbol<K extends keyof KioComponentItem, T extends KioComponentItem[K]>(indexName: string | K, indexSymbol: IndexSymbol<K, T>): void;
    indexOfSymbol(symbol: any): number;
    updateItem(item: KioComponentItem, key: string, value: any): void;
    filter(filter: ItemFilter): KioComponentItem[];
    find(filter: ItemFilter): KioComponentItem;
    findIndex(filter: ItemFilter): number;
    getAt(idx: number): KioComponentItem;
    eachItem(iterator: ItemIterator): void;
    mapItems(mapper: ItemMapper): any[];
    findItemForNode<T extends KioChildContentType, K extends KioNode<T>>(node: K): number;
}
