import { KioContentModel, KioFragmentModel, KioPublicationModel } from 'kio-ng2-data'
import { ComponentContentResolver } from '../interfaces/content-resolver'
import { ContentResolver } from './content.resolver'
import { CONTENT_RESOLVER } from '../content-resolver.token'


export function contentResolverFactory <T extends KioFragmentModel|KioPublicationModel> ( contentModel:T, parentResolver?:ComponentContentResolver ) {
  return new ContentResolver(contentModel,parentResolver)
}