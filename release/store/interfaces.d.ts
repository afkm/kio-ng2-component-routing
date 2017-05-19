import { ComponentFixture, QueryableAnnotation } from '../query/interfaces';
import { KioChildContentType } from 'kio-ng2';
export interface KioComponentItem {
    fixture: ComponentFixture;
    criteria: QueryableAnnotation<KioChildContentType>;
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
export interface IndexSymbol<K extends keyof KioComponentItem, T extends KioComponentItem[K]> {
    componentName: string;
    prop: K;
    symbol: T;
}
export interface IndexSymbolItem<K extends keyof KioComponentItem, T extends KioComponentItem[K]> {
    componentName: string;
    symbol: T;
}
