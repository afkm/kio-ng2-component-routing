import { MockedData, MockingParams } from './interfaces'
export * from './interfaces'
import * as _ from 'lodash'

export const encodeValue = ( value:any ):string => JSON.stringify(value)
export const decodeValue = <T>( value:string ):T => JSON.parse(value)

export const format = <T extends MockingParams, K extends keyof T>( params:T ):string => {
  return Object.keys(params).map ( key => `${key}=${encodeValue(params[key])}` ).join(';')
}

export const parse = ( cuid:string ):MockedData => {
  const [m,paramSource] = cuid.match ( /\[(.*)\]/m )
  if ( !paramSource )
  {
    return null
  }
  const params = paramSource.split('][').slice(1).filter(v=>!!v).map ( tupel => tupel.split('=') )
  if ( params.length === 0 )
    return null

  /*console.log ( 'mocking params' )
  console.table ( params )*/
  const z = _.zip(...params)
  return _.zipObject(z[0],z[1])
}