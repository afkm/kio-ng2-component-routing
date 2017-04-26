import { KioComponentItem, IndexSymbol, ItemIterator, ItemMapper } from './interfaces'
export * from './interfaces'
import { KioContent, KioFragment } from 'kio-ng2'

export * from './store'
import { store } from './store'

export const registerIndex = ( indexName:string, indexSymbols:IndexSymbol[] ) => {

  if ( process.env.NODE_ENV === 'debug' )
  {
    console.log('registerIndex >%s<', indexName)
    const t = `${indexSymbols.length} symbols`
    console.groupCollapsed(t)
    console.table(indexSymbols)
    console.groupEnd()
  }


  indexSymbols.forEach(item => {
    store.addSymbol ( indexName, item )
  })

}

export const registerComponent = ( item:KioComponentItem ) => {
  store.addItem(item)
}

export const getAllComponents = ():KioComponentItem[] => {
  return store.items.slice()
}

export const getComponentAt = ( idx:number ):KioComponentItem => store.getAt(idx)

export const getComponentByName = ( componentName:string ):KioComponentItem => store.find ( ( item:KioComponentItem, idx:number, list:KioComponentItem[] ):boolean => item.componentName === componentName )

export const getComponentIndexForNode = ( node:KioContent|KioFragment ):number => store.findItemForNode ( node )