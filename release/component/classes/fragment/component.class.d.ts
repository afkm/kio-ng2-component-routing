import { KioChildContentType, KioCtnFragment } from 'kio-ng2';
import { KioComponentStructure } from '../component.class';
import { ComponentFragmentStructure } from '../../interfaces/component';
import { ListQuery, QueryableAnnotation } from '../../../query/interfaces';
export declare class KioFragmentComponentStructure extends KioComponentStructure<KioCtnFragment> implements ComponentFragmentStructure {
    readonly modifiers: ListQuery<string>;
    readonly childTypes: ListQuery<QueryableAnnotation<KioChildContentType>>;
    constructor(modifiers: ListQuery<string>, childTypes: ListQuery<QueryableAnnotation<KioChildContentType>>);
}
