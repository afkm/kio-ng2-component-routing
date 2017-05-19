import { KioComponentItem, IndexSymbolItem } from './interfaces';
export * from './interfaces';
import { KioChildContentType, KioNodeType } from 'kio-ng2';
export * from './store';
import { ComponentStructure, ComponentFragmentStructure } from '../component';
export interface NamedComponentStructure<T extends KioChildContentType> extends ComponentStructure<T> {
    name: string;
}
export interface NamedFragmentComponentStructure extends ComponentFragmentStructure {
    name: string;
}
export declare const isNamedComponentStructure: <T extends any>(other: any) => other is NamedComponentStructure<T>;
export declare const isNamedFragmentComponentStructure: (other: any) => other is NamedFragmentComponentStructure;
export declare type NamedComponent = NamedComponentStructure<KioNodeType.src> | NamedComponentStructure<KioNodeType.txt> | NamedFragmentComponentStructure;
export declare const isNamedComponent: (other: any) => other is NamedComponent;
export declare const registerComponentStructure: <T extends any>(data: NamedComponent[]) => void;
export declare const registerIndex: <T extends "fixture" | "criteria" | "componentName" | "component", K extends KioComponentItem[T]>(prop: T, indexSymbolItems: IndexSymbolItem<T, K>[]) => void;
export declare const registerComponent: (item: KioComponentItem) => void;
export declare const getAllComponents: () => KioComponentItem[];
export declare const getComponentAt: (idx: number) => KioComponentItem;
export declare const getComponentByName: (componentName: string) => KioComponentItem;
export declare const getComponentIndexForNode: <T extends any, K extends any>(node: K) => number;
