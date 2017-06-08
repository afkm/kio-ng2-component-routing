import { 
  ListValue , ListQuery ,
  ValueQuery ,
  NumberQuery ,
  ValueTest ,
  valueMatcher ,
  numberMatcher ,
  stringMatcher ,
  listMatcher ,
  valueFilter,
  ValueParam,
  MatchParam,
  Longish
} from '../interfaces'
import { getFilter, eq, isValueFilter } from './value'

/**
 * requires {filter} to match each element of {otherValues}
 * all ( 'txt' ) ( [ 'txt' , 'txt' , 'txt' ] ) -> true
 * all ( 'txt' ) ( [ 'txt' , 'txt' , 'txt', 'txt' ] ) -> true
 * all ( 'txt' ) ( [ 'txt' , 'txt' , 'txt', 'src' ] ) -> true
 */
export const all : listMatcher<any> = ( filter:valueFilter<any> ) => ( otherValues:any[] ) => {
  if ( otherValues.length === 0 )
    return false
  return otherValues.filter ( getFilter(filter) ).length === otherValues.length
}

export const either = <T> ( filterValues:T[] ) => ( values:T[] ) => {
  return filterValues.findIndex ( filterValue => values.indexOf(filterValue) > -1 ) > -1
}

/**
 * requires all values of {value} to be in {listValue}
 * @type {listMatcher<any>}
 * [ a, b ]  eq  [ b, a ] 
 * [ a, b ]  eq  [ c, b, a ]   
 * [ a, d ]  ne  [ c, b, a ]  => d missing
 */
export const contains : listMatcher<any> = ( value:any, invert:boolean=false ):ValueTest<any|any[]>  => {

  if ( Array.isArray ( value ) )
  {
    return ( listValue:any[] ) : boolean => {
      const matchingValues = value.filter ( ( valueItem ) => {
        return contains ( valueItem ) ( listValue )
      } )
      return matchingValues.length === value.length
    }
  }

  return ( listValue:any[] ) => {
    return listValue.indexOf ( value ) > -1 !== invert
  }

}

/**
 * requires all values of {value} to be missing(!) in {listValue}
 * @type {listMatcher<any>}
 * [ a, b ]  ne  [ b, a ] 
 * [ a, b ]  ne  [ c, b, a ]   
 * [ a, b ]  eq  [ c, d ]
 */
export const containsNot : listMatcher<any> = ( value:any ) => contains ( value , true )

/**
 * requires all values of {value} to be in {listValue} in the same order
 * [ a, b ] eq [ a, b ]
 * [ a, b ] ne [ a, b, c ]
 * [ a, b ] ne [ b, a ]
 * @type {listMatcher<any>}
 */
export const deepEqual : listMatcher<any> = ( values:any[] ) => ( otherValues:any[] ):boolean => {
  if ( values.length !== otherValues.length )
    return false
  const left = values.slice()
  const right = otherValues.slice()
  while ( eq ( left.pop() ) ( right.pop() ) )
  {
    if ( left.length === 0 )
      return true
  }
  return false
  //return !values.find ( ( value , idx ) => idx !== otherValues.indexOf(value)  )
}

export function isLongish <T>( other:any ):other is Longish<T> {
  return ('length' in other)
}

/**
 * @param {[type]} otherValues.length [description]
 */
export const hasLength = <T extends Longish<any>>( length:MatchParam<number> ):ValueTest<T> => {
  if ( 'number' === typeof length )
  {
    return ( other:T ):boolean => {
      return other.length === length
    }
  }
  return ( other:T ) => length(other.length)
}


export const query = <T>( listQuery:ListQuery<T>|T[] ) => {
  if ( Array.isArray ( listQuery ) )
  {
    return query ( {deepEqual: listQuery} )
  }
  const assertions = []
  if ( isLongish(listQuery) )
  {
    if ( 'function' === typeof listQuery.length )
    {
      assertions.push ( hasLength( <any>listQuery.length ) )
    }
    assertions.push ( hasLength( <number>listQuery.length ) )
  }
  
  if ( listQuery.contains )
    assertions.push ( contains(listQuery.contains) )

  if ( listQuery.containsNot )
    assertions.push ( containsNot(listQuery.containsNot) )

  if ( listQuery.all )
    assertions.push ( all(listQuery.all) )

  if ( listQuery.deepEqual )
    assertions.push ( deepEqual(listQuery.deepEqual) )

  return ( list:any[] ) => {
    return assertions.length === assertions.filter ( assertion => assertion ( list ) === true ).length
  }
}