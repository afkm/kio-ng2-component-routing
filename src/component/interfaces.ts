/**
 * @module kio-ng2-component-routing
 * @namespace Components
 */

import { 
  KioContentType, KioContent, KioFragment, KioNode, KioNodeType
} from 'kio-ng2'
import { QueryableAnnotation, QueryableFragmentAnnotation, isQueryableAnnotation, isQueryableFragmentAnnotation } from '../query'
import { ListQuery } from '../query'

export interface ComponentStructure extends QueryableAnnotation {}

export const isComponentStructure = ( other:any ):other is ComponentStructure => {
  return isQueryableAnnotation(other)
}

export interface ComponentFragmentStructure extends QueryableFragmentAnnotation {}

export const isComponentFragmentStructure = ( other:any ):other is ComponentFragmentStructure => {
  return (
      'childTypes' in other
      && 
      isQueryableFragmentAnnotation(other)
    )
}

export interface INamedAnnotation {
  name: string
}

export type NamedComponentStructure = INamedAnnotation & ComponentStructure
export type NamedFragmentComponentStructure = INamedAnnotation & ComponentFragmentStructure

export const isNamedAnnotation = ( other:any ):other is INamedAnnotation => {
  return (
      'name' in other
    )
}

export const isNamedComponentStructure = ( other:any ):other is NamedComponentStructure => {
  return (
      isNamedAnnotation(other)
      && 
      isComponentStructure(other)
    )
}

export const isNamedFragmentComponentStructure = ( other:any ):other is NamedFragmentComponentStructure => {
  return (
      isNamedAnnotation(other)
      && 
      isComponentFragmentStructure(other)
    )
}

export type NamedComponent = NamedComponentStructure|NamedComponentStructure|NamedFragmentComponentStructure

export const isNamedComponent = ( other:any ):other is NamedComponent => {
  return isNamedComponentStructure(other) || isNamedFragmentComponentStructure(other)
}
