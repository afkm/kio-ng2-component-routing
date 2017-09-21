import { KioContentModel, KioFragmentModel, KioPublicationModel } from 'kio-ng2-data'

import { Node, Data, Collection, Stateful } from '../interfaces/data-component'
import { ComponentData } from '../types/component-data'

export function isStateful ( other:any ):other is Stateful {
  return ( 
    'object' === typeof other
    &&
    'componentState' in other 
  )
}

export function isNode <T extends ComponentData> ( other:any ):other is Node<T> {
  return ( 
    'object' === typeof other
    &&
    'node' in other 
  )
}

export function isData <T> ( other:any ):other is Data<T> {
  return ( 
    'object' === typeof other
    &&
    'onData' in other 
    &&
    'contentStateChanges' in other 
  )
}

export function isCollection <T>( other:any ):other is Collection<T,Data<T>> {
  return ( 
    'object' === typeof other
    &&
    'node' in other 
    && 
    (other.node instanceof KioFragmentModel || other.node instanceof KioPublicationModel)
  )
}