import { ValueQuery } from './value-query'
import { numberMatcher } from './number.matcher'
import { valueFilter } from './value-filter'


//export interface ListQuery<T> extends ValueQuery<any[]> {
export interface ListQuery<T> extends ValueQuery<T> {
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

  // either ( list )
  // requires one value in list 
  either?:T[]
}