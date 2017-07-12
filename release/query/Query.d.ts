import { KioFragment } from 'kio-ng2-data';
import { QueryableAnnotation } from './interfaces';
export declare const assertComponent: (queryableAnnotation: QueryableAnnotation) => (node: KioFragment) => string[];
export declare const matchComponent: (componentAnnotation: any) => (node: KioFragment) => boolean;
