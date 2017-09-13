import { Annotation, ContentType } from '../interfaces/annotation';
import { ComponentData } from '../types/component-data';
import { Store, StoreItem } from '../interfaces';
export declare class ComponentStore implements Store {
    static AnnotationValue(annotation: Annotation<ContentType>): number;
    readonly size: number;
    protected components: StoreItem[];
    indexOf(item: StoreItem): number;
    registerComponent(componentName: string, annotation: Annotation<ContentType>, component: any): void;
    static FormatStoreItemName(name: string): string;
    map<T>(fn: {
        (item: StoreItem, idx?: number): T;
    }): T[];
    getComponentByName(componentName: string): StoreItem;
    getComponentAt(index: number): StoreItem;
    getComponentForNode(node: ComponentData): StoreItem;
}
export declare const defaultStore: ComponentStore;
