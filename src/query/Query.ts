import { KioFragment, KioNode } from 'kio-ng2'
import { QueryableAnnotation } from './interfaces'

import * as assert from './assertion'
import * as _ from '@types/lodash'

export const assertComponent = ( queryableAnnotation : QueryableAnnotation ) => ( node:KioFragment ) : string[]|null => {

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

  const childTypes = (node.children||[]).map(c => c.type)

  if ( queryableAnnotation.childTypes && assert.query ( queryableAnnotation.childTypes ) ( childTypes ) === false )
  {
    //console.log('invalid node childTypes' , childTypes , '- component requires: ', componentAnnotation.childTypes )
    messages.push ( 'invalid node child types "'+childTypes.join(',')+'" for component. Expected: ' + JSON.stringify(queryableAnnotation.childTypes) )
  }

  return messages.length > 0 ? messages : null

}

export const matchComponent = ( componentAnnotation:any ) => ( node:KioFragment ) => {
  
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

  const childTypes = (node.children||[]).map(c => c.type)

  if ( componentAnnotation.childTypes && assert.query ( componentAnnotation.childTypes ) ( childTypes ) === false )
  {
    //console.log('invalid node childTypes' , childTypes , '- component requires: ', componentAnnotation.childTypes )
    return false
  }

  return true
}
