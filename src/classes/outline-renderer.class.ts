import { EventEmitter } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { OutlineStore, OutlineNode, NestedOutlineItem, getRootNode, OutlineItem } from './outline-store.class'
import { KioFragmentModel, KioPublicationModel } from 'kio-ng2-data'

export class OutlineRenderer {

  constructor ( readonly store:OutlineStore ) {


  }

  protected renderItem ( item:NestedOutlineItem, depth:number=0 ) {

    const prefix = "\t".repeat(depth)

    const openTag = `<${item.selector} cuid="${item.cuid}">`
    const closeTag = `</${item.selector}>`

    const content = item.children.map ( child => this.renderItem(child,depth+1) ).join('\n')

    if ( content ) {
      return `${prefix}${openTag}
${content}
${prefix}${closeTag}`
    } else {
      return `${prefix+openTag+closeTag}`
    }


  }
  
  renderOutline () {

    return this.renderItem(this.store.rootItem)

  }


}
