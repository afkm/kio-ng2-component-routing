import { InjectionToken } from '@angular/core'
import { KioContentModel, KioFragmentModel, KioPublicationModel } from 'kio-ng2-data'

export let NODE_MODEL = new InjectionToken<KioContentModel|KioFragmentModel|KioPublicationModel>('node_model')
