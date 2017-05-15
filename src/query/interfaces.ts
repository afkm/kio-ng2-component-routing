import { 
  KioCtnFragment, KioCtnTxt, KioCtnSrc, KioPrimitiveContentType, KioChildContentType,
  isCtnFragment
} from 'kio-ng2'

export interface Predicate { 
  ( arg:any ) : boolean 
}

export interface Range<T> {
  min?:T;
  max?:T;
}

export type ListValue = any[]
//export type ListCriteria = ListValue|ListQuery

export interface ValueQuery<T> {
  eq?:T
  not?:T
}

export interface NumberQuery extends ValueQuery<number> {
  gt?:number
  lt?:number
  gte?:number
  lte?:number
}

export interface ValueTest<T> {
  (value:T):boolean
}

export interface valueMatcher<T> {
  (value:T):ValueTest<T>
}

export interface numberMatcher {
  (value:number):ValueTest<number>
}

export interface stringMatcher extends valueMatcher<string|RegExp> {}

export interface listMatcher<T> {
  ( value:T, invert?:boolean ):ValueTest<T[]>
}

export type valueFilter<T> = T|ValueTest<T>|T[]

export interface ListQuery<T> extends ValueQuery<ListValue> {
  length?:numberMatcher|number
  
  // contains ( valueFilter )
  // requires all values; can contain other items
  // [ a, b ]  eq  [ b, a ] 
  // [ a, b ]  eq  [ c, b, a ]   
  // [ a, d ]  ne  [ c, b, a ]  => d missing
  contains?:valueFilter<T>  
  
  // containsNot ( valueFilter )
  // requires all values; can contain other items
  // [ a, b ]  eq  [ b, a ] 
  // [ a, b ]  eq  [ c, b, a ]   
  // [ a, d ]  ne  [ c, b, a ]  => d missing
  containsNot?:valueFilter<T>
  
  // all ( valueFilter )
  // requires all items; same length of lists
  // [ a, b ]  eq  [ b, a ] 
  // [ a, b ]  ne  [ a ] 
  // [ a, b ]  ne  [ a, b, c ] 
  all?:valueFilter<T>

  // deepEqual ( list )
  // requires all values in the same order
  // [ a, b ] eq [ a, b ]
  // [ a, b ] ne [ a, b, c ]
  // [ a, b ] ne [ b, a ]
  deepEqual?:T[]
}

export interface ComponentFixture {
  matching:any
}

export type ChildQuery<T extends KioChildContentType> = QueryableAnnotation<T>|T

export interface QueryableAnnotation<T extends KioChildContentType> {
  type:T;
  modifiers:ListQuery<string>;
}

export interface QueryableFragmentAnnotation extends QueryableAnnotation<KioCtnFragment> {
  type:KioCtnFragment
  childTypes:ListQuery<QueryableAnnotation<KioChildContentType>>
}


export const isQueryableAnnotation = <T extends KioChildContentType>( other:any ): other is QueryableAnnotation<T> => {
  return (
      'type' in other
      &&
      'modifiers' in other && Array.isArray(other.modifiers)      
    )
}

export const isQueryableFragmentAnnotation = ( other:any ): other is QueryableFragmentAnnotation => {
  return (
      isQueryableAnnotation(other)
      && 
      isCtnFragment(other.type)
    )
}

