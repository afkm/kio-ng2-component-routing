import { KioComponentItem, ItemIterator, ItemFilter, ItemMapper, IndexSymbol } from './interfaces';
import { KioContent } from 'kio-ng2';
export declare const IndexToPropMap: {
    "PublicationComponents": string;
    "PublicationFixtures": string;
    "PublicationCriterias": string;
};
/**
 * @brief      component item store
 */
export declare class BasicStore {
    items: KioComponentItem[];
    /**
     * register kio component for component routing
     * @param {KioComponentItem} item
     */
    addItem(item: KioComponentItem): void;
    addSymbol(indexName: string, indexSymbol: IndexSymbol): void;
    updateItem(item: KioComponentItem, key: string, value: any): void;
    filter(filter: ItemFilter): KioComponentItem[];
    find(filter: ItemFilter): KioComponentItem;
    getAt(idx: number): KioComponentItem;
    eachItem(iterator: ItemIterator): void;
    mapItems(mapper: ItemMapper): any[];
    findItemForNode(node: KioContent): number;
}
