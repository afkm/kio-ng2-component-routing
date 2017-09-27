import { Annotation, ContentType } from '../interfaces/annotation'
import { ComponentData } from '../types/component-data'
import { Store, StoreItem, ListQuery } from '../interfaces'
import * as dasherize from 'dasherize'
import { matchComponent } from '../matching/Query'

const dasherize:{(value:string):string} = require('dasherize')

const getListQueryValue = ( listQuery:Annotation<ContentType>, m:number=1 ):number => {
  if ( 'string' === typeof listQuery ) {
    return m
  }
  if ( !Array.isArray ( listQuery ) ) {
    let propValues = Object.keys(listQuery).map ( key => {
      switch (key) {
        case "deepEqual":
          return getListQueryValue ( listQuery[key], 10 )
        
        default:
          return getListQueryValue ( listQuery[key] )
      }
    } )
    return propValues.reduce((c,p,i)=>c+p)
  }
  return listQuery.length
}

export class ComponentStore implements Store {

  public static AnnotationValue ( annotation:Annotation<ContentType> ):number {
    return getListQueryValue ( annotation )
  }

  get size ():number {
    return this.components.length
  }

  protected components:StoreItem[]=[]

  indexOf ( item:StoreItem ):number {
    return this.components.findIndex ( $item => $item.name === item.name )
  }

  registerComponent ( componentName:string, annotation:Annotation<ContentType>, component:any ):void
  {
    //console.log('ComponentStore::registerComponent -> %s', componentName, { annotation, component })
    if ( this.getComponentByName ( componentName ) ) {
      return
    }

    const item : StoreItem = {
      name: componentName,
      annotation ,
      component
    }

    //console.log('ComponentStore::registerComponent | storeItem', item )
    const idx = this.components.push ( item )

    // window.afkm.logger.log('component store item added at %s: ', idx, item )
  }

  public static FormatStoreItemName ( name:string ) {
    return dasherize ( name.replace (  /^(kio|publication)\-/, '' ) )
  }

  map <T> ( fn:{(item:StoreItem, idx?:number):T} ) {
    return this.components.map ( fn )
  }

  getComponentByName ( componentName:string ) {
    componentName = (componentName||'').replace ( /component/i, '' )
    componentName = dasherize(componentName)
    return this.components.find ( storeItem => ComponentStore.FormatStoreItemName(storeItem.name) === componentName )
  }

  getComponentAt ( index:number ):StoreItem {
    return this.components [ index ]
  }

  getComponentForNode ( node:ComponentData ):StoreItem {

    const matchingComponents:StoreItem[] = []
    this.components.forEach ( ( storeItem:StoreItem, idx:number ) => {
      if ( matchComponent ( storeItem.annotation ) ( node ) ) {
        matchingComponents.push ( storeItem )
      }
    } )

    const r = matchingComponents.sort ( ( a:StoreItem, b:StoreItem ) => {
      const aValue = ComponentStore.AnnotationValue ( a.annotation )
      const bValue = ComponentStore.AnnotationValue ( b.annotation )      
      return aValue - bValue
    } )

    return r.shift()
  }

}

export const defaultStore = new ComponentStore()