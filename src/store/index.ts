import { KioComponentItem, IndexSymbol, ItemIterator, ItemMapper } from './interfaces'
export * from './interfaces'
import { KioContent } from 'kio-ng2'

import { ComponentsStore } from './ComponentsStore.class'

const store = new ComponentsStore()

export const registerIndex = ( indexName:string, indexSymbols:IndexSymbol[] ) => {

  console.log('registerIndex >%s<', indexName)
  const t = `${indexSymbols.length} symbols`
  console.groupCollapsed(t)
  console.table(indexSymbols)
  console.groupEnd()


  indexSymbols.forEach(item => {
    store.addSymbol ( indexName, item )
  })

}

export const registerComponent = ( item:KioComponentItem ) => {
  store.addItem(item)
}

export const getAllComponents = ():KioComponentItem[] => store.items.slice()

export const getComponentAt = ( idx:number ):KioComponentItem => store.getAt(idx)

export const getComponentByName = ( componentName:string ):KioComponentItem => store.find ( ( item:KioComponentItem, idx:number, list:KioComponentItem[] ):boolean => item.componentName === componentName )

export const getComponentIndexForNode = ( node:KioContent ):number => store.findItemForNode ( node )