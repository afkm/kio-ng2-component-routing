import { KioComponentItem, IndexSymbol } from './interfaces';
export * from './interfaces';
import { KioNode, KioChildContentType, KioNodeType } from 'kio-ng2';
export * from './store';
import { ComponentStructure, ComponentFragmentStructure } from '../component';
export interface NamedComponentStructure<T extends KioChildContentType> extends ComponentStructure<T> {
    name: string;
}
export interface NamedFragmentComponentStructure extends ComponentFragmentStructure {
    name: string;
}
export declare const isNamedComponentStructure: <T extends KioChildContentType>(other: any) => other is NamedComponentStructure<T>;
export declare const isNamedFragmentComponentStructure: (other: any) => other is NamedFragmentComponentStructure;
export declare type NamedComponent = NamedComponentStructure<KioNodeType.src> | NamedComponentStructure<KioNodeType.txt> | NamedFragmentComponentStructure;
export declare const isNamedComponent: (other: any) => other is NamedComponent;
export declare const registerComponentStructure: <T extends KioChildContentType>(data: NamedComponent[]) => void;
export declare const registerIndex: <T extends "fixture" | "criteria" | "componentName" | "component", K extends KioComponentItem[T]>(indexName: T, indexSymbols: IndexSymbol<T, K>[]) => void;
export declare const registerComponent: (item: KioComponentItem) => void;
export declare const getAllComponents: () => KioComponentItem[];
export declare const getComponentAt: (idx: number) => KioComponentItem;
export declare const getComponentByName: (componentName: string) => KioComponentItem;
export declare const getComponentIndexForNode: <T extends KioChildContentType, K extends KioNode<T>>(node: K) => number;
