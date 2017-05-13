import { KioChildContentType } from 'kio-ng2'
import { QueryableAnnotation, QueryableFragmentAnnotation } from '../../query/interfaces'
import { ListQuery } from '../../query/interfaces'

export interface ComponentStructure<T extends KioChildContentType> extends QueryableAnnotation<T> {

}

export interface ComponentFragmentStructure extends QueryableFragmentAnnotation {
  childTypes:ListQuery<ComponentStructure<KioChildContentType>>
}