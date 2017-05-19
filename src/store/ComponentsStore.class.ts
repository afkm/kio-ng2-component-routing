//import { ComponentFixture, QueryableAnnotation } from '../query/interfaces'
import { 
  KioComponentItem, 
  ItemIterator, ItemFilter, ItemMapper,
  IndexSymbol 
} from './interfaces'

import { assertComponent, matchComponent } from '../query/Query'
import * as _ from 'lodash'

import { 
  KioNode, KioFragment, KioContent,
  KioChildContentType
} from 'kio-ng2'

const indexToProp = {
  "PublicationComponents": "component",
  "PublicationFixtures": "fixture",
  "PublicationCriterias": "criteria"
}

const emptyItem:KioComponentItem = {
  componentName: undefined,
  component: undefined,
  fixture: undefined,
  criteria: undefined
}

const isPropKey = ( key:string|keyof KioComponentItem ):key is keyof KioComponentItem => {
  return key in emptyItem
}

const propkey = ( key:string|keyof KioComponentItem ):keyof KioComponentItem => {
  if ( isPropKey(key) )
  {
    return key
  }
  return indexToProp[key]
}

const normalizeComponentName = ( name:string ) => {
  return name.replace(/Component$/,'')
}

export class ComponentsStore {

  items:KioComponentItem[]=[]

  /**
   * register kio component for component routing
   * @param {KioComponentItem} item 
   */
  addItem ( item:KioComponentItem ) {
    this.items.push ( item )
  }

  addSymbol <K extends keyof KioComponentItem, T extends KioComponentItem[K]>( indexName:string|K, indexSymbol:IndexSymbol<K,T> ) {

    const indexPropKey = propkey(indexName)

    const {
      componentName,
      symbol
    } = indexSymbol

    let componentItem = this.find((item,idx)=> normalizeComponentName(item.componentName) === normalizeComponentName(componentName) )
    if ( !componentItem )
    {
      componentItem = {
        ...emptyItem,
        componentName: normalizeComponentName(componentName)
      }
      this.addItem(componentItem)
    }
    this.updateItem(componentItem,indexPropKey,symbol)
  }

  indexOfSymbol ( symbol:any ) {
    return this.findIndex((item,idx)=> {
      return item.component === symbol || item.criteria === symbol || item.fixture === symbol
    } )
  }

  updateItem ( item:KioComponentItem, key:string, value:any ) {
    const items = this.items.slice()
    this.items = items.map ( ( mapItem, idx ) => {
      if ( item !== mapItem )
        return mapItem
      return {
        ...item ,
        [key]: value
      }
    } )
  }

  filter ( filter:ItemFilter ):KioComponentItem[] {
    return _.filter(this.items,filter)
  }

  find ( filter:ItemFilter ):KioComponentItem {
    return _.find(this.items,filter)
  }

  findIndex ( filter:ItemFilter ):number {
    return _.findIndex(this.items,filter)
  }

  getAt ( idx:number ):KioComponentItem {
    return this.items[idx]
  }

  eachItem ( iterator:ItemIterator ):void {
    const clonedList = this.items.slice()
    this.items.forEach ( ( item:KioComponentItem, idx:number ) => iterator ( item, idx, clonedList ) )
  }

  mapItems ( mapper:ItemMapper ):any[] {
    const clonedList = this.items.slice()
    return this.items.map ( ( item:KioComponentItem, idx:number ) => mapper ( item, idx, clonedList ) )
  }

  findItemForNode <T extends KioChildContentType, K extends KioNode<T>> ( node:K ):number {
    return _.findIndex(this.items, ( item:KioComponentItem, idx:number ):boolean => {
      return item.criteria && matchComponent ( item.criteria ) ( node )
    } )
  }

}