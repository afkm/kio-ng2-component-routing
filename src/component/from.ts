import { KioFragmentComponentStructure } from './classes/fragment/component.class'
import { KioContentComponentStructure } from './classes/node/component.class'
import { KioComponentStructure } from './classes/component.class'
import { 
  QueryableAnnotation, QueryableFragmentAnnotation, ListQuery, valueFilter, valueMatcher,
  isQueryableAnnotation, isQueryableFragmentAnnotation
} from '../query/interfaces'

import { 
  KioChildContentType, 
  KioPrimitiveContentType,
  implementsKioNode,
  isChildContentType,
  isCtnFragment,
  isCtnSrc,
  isCtnTxt,
  KioNodeType,
  nodeTypeByName
} from 'kio-ng2'



export const isListQuery = <T> ( other:any ):other is ListQuery<T> => {
  return (
      ('length' in other && ('number' === typeof other.length || 'function' === typeof other.length ))
      ||
      ( 'contains' in other )
      ||
      ( 'containsNot' in other )
      ||
      ( 'all' in other )
      ||
      ( 'deepEqual' in other )
    )
}

const createListQuery = <T>( value:T|T[] ) => {
  if ( Array.isArray(value) )
  {
    return {deepEqual: value}
  }
  if ( isListQuery ( value ) )
  {
    return value 
  }
  return {
    deepEqual: [value]
  }
}

export const parseListQuery = <T>( query:T|T[]|ListQuery<T>, sep='.' ):ListQuery<T> => {

  if ( isListQuery(query) )
  {
    return query
  }
  else if ( Array.isArray(query) )
  {
    return createListQuery<T>(query)
  }
  else {
    return parseListQuery ( [query] )
  }

}

export const fromString = <T extends KioNodeType>( source:string ):KioFragmentComponentStructure|KioContentComponentStructure<KioPrimitiveContentType> => {

  const [ fragmentSource, ...children ] = source.split(' ')
  const [ _ , ptype=undefined, ...pmodifiers ] = fragmentSource.match(/(txt|src|fragment)(\.(\w+)){0,}/)

  const modifiers:ListQuery<string> = parseListQuery(pmodifiers)

  if ( isChildContentType(ptype) )
  {
    if ( isCtnFragment (ptype) )
    {
      return new KioFragmentComponentStructure(modifiers,children.map(fromString))
    }
    else if ( isCtnSrc (ptype) )
    {
      return new KioContentComponentStructure(KioNodeType.src,modifiers)
    }
    else if ( isCtnTxt (ptype) )
    {
      return new KioContentComponentStructure(KioNodeType.txt,modifiers)
    }
  }
}

export const fromObject = <T extends KioChildContentType> ( annotation:QueryableAnnotation<T>|QueryableFragmentAnnotation  ) => {
  if ( isQueryableFragmentAnnotation(annotation) )
  { 
    return new KioFragmentComponentStructure(annotation.modifiers,annotation.childTypes)
  }
}