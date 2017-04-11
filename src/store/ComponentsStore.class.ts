import { ComponentFixture, QueryableAnnotation } from '../query/interfaces'
import { assertComponent, matchComponent } from '../query/Query'
import * as _ from 'lodash'

import { KioNode, KioFragment, KioContent } from 'kio-ng2'

export interface KioComponentItem {
  fixture:ComponentFixture;
  criteria:QueryableAnnotation;
  componentName:string;
  component:any;
}

export interface ItemIterator {
  ( item:KioComponentItem, idx?:number, list?:KioComponentItem[] ):void
}

export interface ItemMapper {
  ( item:KioComponentItem, idx?:number, list?:KioComponentItem[] ):any
}

export interface ItemFilter {
  ( item:KioComponentItem, idx?:number, list?:KioComponentItem[] ):boolean
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

  filter ( filter:ItemFilter ):KioComponentItem[] {
    return _.filter(this.items,filter)
  }

  find ( filter:ItemFilter ):KioComponentItem {
    return _.find(this.items,filter)
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

  findItemForNode ( node:KioContent ):number {
    return _.findIndex(this.items, ( item:KioComponentItem, idx:number ):boolean => {
      return matchComponent ( item.criteria ) ( node )
    } )
  }

}