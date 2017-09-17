import { Annotation, ContentType } from './annotation';
import { ComponentData } from '../types/component-data';
export interface StoreItem {
    name: string;
    annotation: Annotation<ContentType>;
    component: any;
    fixture?: any;
}
export interface Store {
    readonly size: number;
    indexOf(item: StoreItem): number;
    registerComponent(componentName: string, annotation: Annotation<ContentType>, component: any): void;
    getComponentAt(index: number): StoreItem;
    getComponentForNode(node: ComponentData): StoreItem;
    getComponentByName(componentName: string): StoreItem;
}
