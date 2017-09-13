import { KioFragment } from 'kio-ng2-data';
import { Annotation, ContentType } from '../interfaces';
export declare const assertComponent: (queryableAnnotation: Annotation<ContentType>) => (node: KioFragment) => string[];
export declare const matchComponent: (componentAnnotation: any) => (node: KioFragment) => boolean;
