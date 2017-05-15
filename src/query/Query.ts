import { 
  KioFragment, implementsKioFragment, 
  isCtnFragment, implementsKioNode,
  KioCtnFragment, KioNode, KioChildContentType, KioPrimitiveContentType, 
  KioNodeType
} from 'kio-ng2'
import { QueryableAnnotation, QueryableFragmentAnnotation } from './interfaces'

import * as assert from './assertion'
import * as _ from '@types/lodash'

const isQueryableFragmentAnnotation = ( other:any ): other is QueryableFragmentAnnotation => {
  return (
      implementsKioNode(other)
      && 
      isCtnFragment(other.type)
    )
}


export const assertComponent = <T extends KioChildContentType>( queryableAnnotation : QueryableFragmentAnnotation|QueryableAnnotation<T> ) => ( node:KioFragment<KioCtnFragment>|KioNode<KioPrimitiveContentType> ) : string[]|null => {

  const messages:string[] = []

  if ( queryableAnnotation.type && assert.eq ( queryableAnnotation.type ) ( node.type ) === false )
  {
    //console.log('invalid node type ' , node.type , ' - component requires: ' , queryableAnnotation.type )
    messages.push ( 'invalid node type "'+node.type+'" for component' )
  }

  if ( queryableAnnotation.modifiers && assert.query ( queryableAnnotation.modifiers ) ( node.modifiers ) === false )
  {
    //console.log('invalid node modifiers' , node.modifiers , '- component requires: ', queryableAnnotation.modifiers )
    messages.push ( 'invalid node modifiers "'+node.modifiers.join(',')+'" for component' )
  }

  if ( isQueryableFragmentAnnotation(queryableAnnotation) && implementsKioFragment(node) )
  {
    const childTypes = ((<any>node).children||[]).map(c => c.type)

    if ( queryableAnnotation.childTypes && assert.query ( queryableAnnotation.childTypes ) ( childTypes ) === false )
    {
      //console.log('invalid node childTypes' , childTypes , '- component requires: ', componentAnnotation.childTypes )
      messages.push ( 'invalid node child types "'+childTypes.join(',')+'" for component. Expected: ' + JSON.stringify(queryableAnnotation.childTypes) )
    }
  }

  return messages.length > 0 ? messages : null

}

export const matchComponent = <T extends KioChildContentType>( componentAnnotation : QueryableFragmentAnnotation|QueryableAnnotation<T> ) => ( node:KioFragment<KioCtnFragment>|KioNode<KioPrimitiveContentType> ):boolean => {
  
  if ( componentAnnotation.type && assert.eq ( componentAnnotation.type ) ( node.type ) === false )
  {
    //console.log('invalid node type ' , node.type , ' - component requires: ' , componentAnnotation.type )
    return false
  }

  if ( componentAnnotation.modifiers && assert.query ( componentAnnotation.modifiers ) ( node.modifiers ) === false )
  {
    //console.log('invalid node modifiers' , node.modifiers , '- component requires: ', componentAnnotation.modifiers )
    return false
  }

  if ( isQueryableFragmentAnnotation(componentAnnotation) && implementsKioFragment(node) )
  {

    const childTypes = node.children.map(c => c.type)

    if ( componentAnnotation.childTypes && assert.query ( componentAnnotation.childTypes ) ( childTypes ) === false )
    {
      //console.log('invalid node childTypes' , childTypes , '- component requires: ', componentAnnotation.childTypes )
      return false
    }

  }

  return true
}
