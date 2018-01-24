import { Observable } from 'rxjs/Observable'
import { Injectable, EventEmitter } from '@angular/core'
import { OutlineElement } from '../interfaces/outline'

import { KioFragmentModel, KioContent, KioNode, KioContentModel, KioPublicationModel, KioPublication } from 'kio-ng2-data'
import { OutlineStore, OutlineNode, getRootNode } from '../classes/outline-store.class'
import { OutlineRenderer } from '../classes/outline-renderer.class'




declare global {
  interface Window {
    outlineService:OutlineService
  }
}


@Injectable()
export class OutlineService {

  constructor () {
    window.outlineService = this
  }

  publicationStores:OutlineStore[]=[]

  getStoreForPublication ( publication:KioPublication ) {

    let store:OutlineStore = this.publicationStores.find ( ps => ps.publication.cuid === publication.cuid )
    if ( !store ) {
      store = new OutlineStore(publication)
      this.publicationStores.push(store)
    }
    return store

  }

  registerNode ( node:KioFragmentModel|KioContentModel|KioPublicationModel, componentSelector:string ) {

    if ( node instanceof KioPublicationModel ) {
    
      const store = new OutlineStore(<any>node)
      this.publicationStores.push(store)
    
    } else {
      
      const pub = getRootNode(node)
      const store = this.getStoreForPublication(pub)
      store.registerNode(node,componentSelector)

    }

  }

  emitNestedOutline ( ) {

    this.publicationStores.forEach ( store => {

      const renderer = new OutlineRenderer(store)
      console.groupCollapsed(`Publication ${store.publication.cuid} - ${store.publication.title}`)
      console.log(renderer.renderOutline())
      console.groupEnd()
      
    } )

  }

}
