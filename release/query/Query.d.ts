import { KioFragment, KioNode, KioChildContentType, KioPrimitiveContentType, KioNodeType } from 'kio-ng2';
import { QueryableAnnotation, QueryableFragmentAnnotation } from './interfaces';
export declare const assertComponent: <T extends KioChildContentType>(queryableAnnotation: QueryableFragmentAnnotation | QueryableAnnotation<T>) => (node: KioFragment<KioNodeType.fragment> | KioNode<KioPrimitiveContentType>) => string[];
export declare const matchComponent: <T extends KioChildContentType>(componentAnnotation: QueryableFragmentAnnotation | QueryableAnnotation<T>) => (node: KioFragment<KioNodeType.fragment> | KioNode<KioPrimitiveContentType>) => boolean;
