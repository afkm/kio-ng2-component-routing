import { 
  KioComponentItem, IndexSymbol, ItemIterator, ItemMapper
} from './interfaces'
export * from './interfaces'
import { 
  KioContent, KioFragment, KioNode, KioChildContentType, KioNodeType 
} from 'kio-ng2'

export * from './store'
import { store } from './store'

import { 
  KioFragmentComponentStructure, KioContentComponentStructure, ComponentStructure, ComponentFragmentStructure,
  isComponentStructure, isComponentFragmentStructure
} from '../component'

export interface NamedComponentStructure<T extends KioChildContentType> extends ComponentStructure<T> {
  name: string
}
export interface NamedFragmentComponentStructure extends ComponentFragmentStructure {
  name: string
}

export const isNamedComponentStructure = <T extends KioChildContentType> ( other:any ):other is NamedComponentStructure<T> => {
  return (
      'name' in other
      && 
      isComponentStructure(other)
    )
}

export const isNamedFragmentComponentStructure = ( other:any ):other is NamedFragmentComponentStructure => {
  return (
      'name' in other
      && 
      isComponentFragmentStructure(other)
    )
}

export type NamedComponent = NamedComponentStructure<KioNodeType.src>|NamedComponentStructure<KioNodeType.txt>|NamedFragmentComponentStructure

export const isNamedComponent = ( other:any ):other is NamedComponent => {
  return isNamedComponentStructure(other) || isNamedFragmentComponentStructure(other)
}

export const registerComponentStructure = <T extends KioChildContentType>( data:NamedComponent[] ) => {

  data.forEach ( comp => {
    store.addSymbol("criteria",{
      componentName: comp.name,
      prop: 'criteria',
      symbol: comp
    })
  } )

}

export const registerIndex = <T extends keyof KioComponentItem, K extends KioComponentItem[T]>( indexName:T, indexSymbols:IndexSymbol<T,K>[] ) => {

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

export const getComponentIndexForNode = <T extends KioChildContentType, K extends KioNode<T>>( node:K ):number => store.findItemForNode ( node )