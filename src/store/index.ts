import { ComponentsStore, KioComponentItem, ItemIterator, ItemMapper } from './ComponentsStore.class'
import { KioContent } from 'kio-ng2'

const store = new ComponentsStore()

export const registerComponent = ( item:KioComponentItem ) => {
  store.addItem(item)
}

export const getAllComponents = ():KioComponentItem[] => store.items.slice()

export const getComponentAt = ( idx:number ):KioComponentItem => store.getAt(idx)

export const getComponentByName = ( componentName:string ):KioComponentItem => store.find ( ( item:KioComponentItem, idx:number, list:KioComponentItem[] ):boolean => item.componentName === componentName )

export const getComponentIndexForNode = ( node:KioContent ):number => store.findItemForNode ( node )