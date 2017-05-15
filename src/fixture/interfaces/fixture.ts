import { KioChildContentType, KioNodeType } from 'kio-ng2'
import { QueryableAnnotation, QueryableFragmentAnnotation } from '../../query/interfaces'
import { ListQuery } from '../../query/interfaces'

export interface ComponentFixture<T extends KioChildContentType> {
  type:T
  readonly modifiers:string[]
}
/*
export interface ComponentFragmentFixture extends ComponentFixture<KioNodeType.fragment> {
  childTypes:ComponentFixture<KioChildContentType>[]
}*/