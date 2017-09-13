import { KioFragmentModel, KioPublicationModel } from 'kio-ng2-data';
import { ComponentContentResolver } from '../interfaces/content-resolver';
import { ContentResolver } from './content.resolver';
export declare function contentResolverFactory<T extends KioFragmentModel | KioPublicationModel>(contentModel: T, parentResolver?: ComponentContentResolver): ContentResolver;
