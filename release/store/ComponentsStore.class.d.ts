import { ComponentFixture, QueryableAnnotation } from '../query/interfaces';
import { KioContent } from 'kio-ng2';
export interface KioComponentItem {
    fixture: ComponentFixture;
    criteria: QueryableAnnotation;
    componentName: string;
    component: any;
}
export interface ItemIterator {
    (item: KioComponentItem, idx?: number, list?: KioComponentItem[]): void;
}
export interface ItemMapper {
    (item: KioComponentItem, idx?: number, list?: KioComponentItem[]): any;
}
export interface ItemFilter {
    (item: KioComponentItem, idx?: number, list?: KioComponentItem[]): boolean;
}
export declare class ComponentsStore {
    items: KioComponentItem[];
    /**
     * register kio component for component routing
     * @param {KioComponentItem} item
     */
    addItem(item: KioComponentItem): void;
    filter(filter: ItemFilter): KioComponentItem[];
    find(filter: ItemFilter): KioComponentItem;
    getAt(idx: number): KioComponentItem;
    eachItem(iterator: ItemIterator): void;
    mapItems(mapper: ItemMapper): any[];
    findItemForNode(node: KioContent): number;
}
