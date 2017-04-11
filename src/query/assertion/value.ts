import { 
  ListValue , ListQuery ,
  ValueQuery ,
  NumberQuery ,
  ValueTest ,
  valueMatcher ,
  numberMatcher ,
  stringMatcher ,
  listMatcher ,
  valueFilter
} from '../interfaces'

export const eq : valueMatcher<any> = ( value:any ) => {
  if ( value && 'function' === typeof value.test )
    return value.test.bind ( value )
  return ( otherValue:any ) => value === otherValue
}
export const gt : numberMatcher = ( value:number ) => ( otherValue :number ) => otherValue > value
export const gte : numberMatcher = ( value:number ) => ( otherValue :number ) => otherValue >= value
export const lt : numberMatcher = ( value:number ) => ( otherValue :number ) => otherValue < value
export const lte : numberMatcher = ( value:number ) => ( otherValue :number ) => otherValue <= value

export const match : stringMatcher = ( value:string|RegExp ) => {
  if ( 'string' === typeof value )
  {
    return eq(value)
  }
  return value.test.bind(value)
}

export const getFilter : valueFilter<any> = ( filter:valueFilter<any> ) => {
  if ( 'function' !== typeof filter )
  {
    return eq ( filter )
  }
  return filter
}

