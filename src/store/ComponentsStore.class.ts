//import { ComponentFixture, QueryableAnnotation } from '../query/interfaces'
import { 
  KioComponentItem, 
  ItemIterator, ItemFilter, ItemMapper,
  IndexSymbol 
} from './interfaces'
import { KioContent } from 'kio-ng2'


import { BasicStore } from './BasicStore.class'

export class ComponentsStore extends BasicStore {

  registerIndex( indexName:string, indexSymbols:IndexSymbol[] ) {

    console.log('registerIndex >%s<', indexName)
    const t = `${indexSymbols.length} symbols`
    console.groupCollapsed(t)
    console.table(indexSymbols)
    console.groupEnd()


    indexSymbols.forEach(item => {
      this.addSymbol ( indexName, item )
    })

  }

  registerComponent( item:KioComponentItem ) {
    this.addItem(item)
  }

  getAllComponents():KioComponentItem[] {
    return this.items.slice()
  }

  getComponentAt( idx:number ):KioComponentItem {
    return this.getAt(idx)
  }

  getComponentByName( componentName:string ):KioComponentItem  {
    return this.find ( ( item:KioComponentItem, idx:number, list:KioComponentItem[] ):boolean => item.componentName === componentName )
  }

  getComponentIndexForNode( node:KioContent ):number {
    return this.findItemForNode ( node ) 
  } 

}