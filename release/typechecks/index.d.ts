import { Node, Data, Collection, Stateful } from '../interfaces/data-component';
import { ComponentData } from '../types/component-data';
export declare function isStateful(other: any): other is Stateful;
export declare function isNode<T extends ComponentData>(other: any): other is Node<T>;
export declare function isData<T>(other: any): other is Data<T>;
export declare function isCollection<T>(other: any): other is Collection<T, Data<T>>;
