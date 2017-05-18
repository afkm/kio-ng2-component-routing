import { 
  KioContentModel, KioFragmentModel, KioNestedContentType, KioCtnFragment, KioNodeModel,
  KioPrimitiveContentType,
  isPrimitiveContentType,
  KioChildContentType,
  isCtnFragment, isCtnPublication, KioCtnSrc, KioCtnTxt,
  KioNodeType, nodeType, primitiveNodeType, isCtnSrc, isCtnTxt
} from 'kio-ng2'

import { fromString, fromObject } from '../component/from'

declare const require
const _cuid = require('cuid')

const parseModifiers = ( value:string ):string[] => (value.match ( /\.(\w+)/gm )||[]).map ( v => v.substr(1) )
const parseTypeName = ( value:string ):string => (value.match(/^\w+/)||[])[0]
const parseTypeParams = ( value:string ):string => (value.match(/(\(.+\))/)||[])[0]


export interface MockSchema<T extends KioNodeType> {
  type:T
  cuid?:string
  modifiers?:string[]
  typeParams?:string
}

export type MockedItem = MockSchema<KioNodeType>|KioContentModel<KioPrimitiveContentType>|KioFragmentModel<KioCtnFragment>|string

export function isMockSchema<T extends KioNodeType> ( other:any ):other is MockSchema<T> {
  return (
      'type' in other
      &&
      (
        'cuid' in other
        ||
        'modifiers' in other
        ||
        'typeParams' in other
      )
    )
}

const parse = <T extends KioNodeType>( value:string ):MockSchema<T> => {
  const typeParams = parseTypeParams ( value )
  const typeName = parseTypeName ( value )
  const modifiers = value.replace(typeParams,'').split('.').slice(1)

  return {
    type: nodeType<T>(typeName), 
    modifiers, 
    typeParams
  }
}


export const cuid = ( ...params ):string => {
  const prefixes = [ 'mock' , ...params ]  
  return '[' + prefixes.join('][')  + ']' + _cuid()
}

export const mockFragment =( children:MockedItem[], modifiers:string[]=[] ):KioFragmentModel<KioCtnFragment> => {
  return new KioFragmentModel<KioCtnFragment>( <any>{
    cuid: cuid() ,
    modifiers ,
    type: 'fragment' ,
    children: children.map ( child => {
      if ( child instanceof KioNodeModel )
      {
        return child
      }
      if ( isMockSchema<KioPrimitiveContentType>(child) )
      {
        if ( <number>child.type !== KioNodeType.fragment )
        {
          return new KioContentModel(child.type, <any>child)
        }
        if ( <number>child.type === KioNodeType.fragment )
        {
          return new KioFragmentModel(<any>child)
        }
      }

      if ( Array.isArray ( child ) )
      {
        return mockFragment ( child[0], child[1] )
      }
      if ( 'string' === typeof child )
      {
        return mockContentFromString ( child )
      }
    } )
  } )
}

export const mockContentFromString = ( selector:string ) => {
  const [ m , typeName , typeParams , ...modifiers ] = selector.match( /^(\w+)(\(.*\))?(\.\w+){0,}/ )
  return mockContent ( typeName , modifiers )
}

export const mockPrimitive = <T extends KioPrimitiveContentType>( type:T, modifiers:string[], cuid:string, parent?:KioFragmentModel<KioNestedContentType> ):KioContentModel<T> => {
  const data = {
    type ,
    modifiers,
    cuid,
    locale: 'en_US'
  }
  return new KioContentModel(type,data,parent)
}

export function mockContent <T extends KioCtnTxt|KioCtnSrc>( value:string|T, modifiers:string[]=[], parent?:KioFragmentModel<KioNestedContentType> ):KioContentModel<T> {
  if ( 'string' === typeof value )
  {

    const { type , modifiers=[] , typeParams='' } = parse ( value )  
    const params = typeParams.slice(1,-1)
                    .split(';')
    
    if ( isPrimitiveContentType(type) )
    {
      return mockPrimitive<T>(<T>type,modifiers,cuid(...params),parent)
    }
  }
  else {
    return mockPrimitive (value,modifiers,cuid(),parent)  
  }


                    /*.map ( tupelSrc => tupelSrc.split('=') )
                    .map ( ([key,value]) => ({key, value}) )*/

  
}
