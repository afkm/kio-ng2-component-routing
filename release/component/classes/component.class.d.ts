import { KioChildContentType } from 'kio-ng2';
import { ComponentStructure } from '../interfaces/component';
import { ListQuery } from '../../query/interfaces';
export declare class KioComponentStructure<T extends KioChildContentType> implements ComponentStructure<T> {
    readonly type: T;
    readonly modifiers: ListQuery<string>;
    constructor(type: T, modifiers: ListQuery<string>);
}
