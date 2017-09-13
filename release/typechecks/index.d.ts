import { Node, Data, Collection, Stateful } from '../interfaces/data-component';
export declare function isStateful(other: any): other is Stateful;
export declare function isNode<T>(other: any): other is Node<T>;
export declare function isData<T>(other: any): other is Data<T>;
export declare function isCollection<T>(other: any): other is Collection<T, Data<T>>;
