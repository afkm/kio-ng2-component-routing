import { InjectionToken } from '@angular/core'
import { ComponentContentResolver } from './interfaces/content-resolver'
import { KioContentModel, KioFragmentModel, KioPublicationModel } from 'kio-ng2-data'


export let CONTENT_RESOLVER = new InjectionToken<ComponentContentResolver>('content_resolver')
