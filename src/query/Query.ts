import { KioFragment, KioNode } from 'kio-ng2'
import { QueryableAnnotation, QueryableFragmentAnnotation, isQueryableAnnotation, isQueryableFragmentAnnotation } from './interfaces'

import * as assert from './assertion'
import * as _ from '@types/lodash'

export interface AnnotationNodeMatcher {
  ( node:KioNode ):boolean
}

export interface AnnotationNodeAssertion {
  ( node:KioNode ):string[]|null
}

export type ComponentMatchingArgument = QueryableFragmentAnnotation|QueryableAnnotation

export module Query {
  /**
   * @brief      component criteria assertion; returns assertion messages, if any issues occur
   *
   * @param      queryableAnnotation  component query annotation
   * @param      node                 kio node to assert
   *
   * @return     list of assertion messages or null
   */
  export function assertComponent( queryableAnnotation : ComponentMatchingArgument ):AnnotationNodeAssertion {
    return ( node:KioFragment ) : string[]|null => {

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

      if ( isQueryableFragmentAnnotation(queryableAnnotation) )
      {
        if ( assert.query ( queryableAnnotation.childTypes ) ( childTypes ) === false )
        {
          //console.log('invalid node childTypes' , childTypes , '- component requires: ', componentAnnotation.childTypes )
          messages.push ( 'invalid node child types "'+childTypes.join(',')+'" for component. Expected: ' + JSON.stringify(queryableAnnotation.childTypes) )
        }
      }

      return messages.length > 0 ? messages : null

    }
  }

  export function matchComponent ( componentAnnotation:any ):AnnotationNodeMatcher {
    return ( node:KioFragment ) => {
    
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
  }
}