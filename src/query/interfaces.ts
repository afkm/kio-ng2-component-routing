export interface Predicate { 
  ( arg:any ) : boolean 
}

export interface Longish<T> {
  length:T
}

export interface Range<T> {
  min?:T;
  max?:T;
}

export type ValueParam<T> = T|T[]

export type MatchParam<T> = T|ValueTest<T>

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

export interface numberMatcher extends valueMatcher<number> {
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

  // either ( list )
  // requires one value in list 
  either?:T[]
}

export interface ComponentFixture {
  matching:any
}

export interface QueryableAnnotation {
  type:string;
  modifiers?:ListQuery<string>;
  childTypes?:ListQuery<string>;
  fixture?:ComponentFixture
}
