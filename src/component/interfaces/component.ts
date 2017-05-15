import { KioChildContentType } from 'kio-ng2'
import { QueryableAnnotation, QueryableFragmentAnnotation, isQueryableAnnotation, isQueryableFragmentAnnotation } from '../../query/interfaces'
import { ListQuery } from '../../query/interfaces'

export interface ComponentStructure<T extends KioChildContentType> extends QueryableAnnotation<T> {

}

export const isComponentStructure = <T extends KioChildContentType> ( other:any ):other is ComponentStructure<T> => {
  return isQueryableAnnotation(other)
}

export interface ComponentFragmentStructure extends QueryableFragmentAnnotation {
  childTypes:ListQuery<ComponentStructure<KioChildContentType>>
}


export const isComponentFragmentStructure = ( other:any ):other is ComponentFragmentStructure => {
  return (
      'childTypes' in other
      && 
      isQueryableFragmentAnnotation(other)
    )
}