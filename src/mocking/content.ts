import { KioContentModel, KioFragmentModel } from 'kio-ng2-data'
import { MockingParams, MockedData, format as formatArgs, parse as parseArgs } from './args'

import { cuid } from './cuid'


const parseModifiers = ( value:string ):string[] => (value.match ( /\.(\w+)/gm )||[]).map ( v => v.substr(1) )
const parseTypeName = ( value:string ):string => (value.match(/^\w+/)||[])[0]
const parseTypeParams = ( value:string ):string => (value.match(/(\(.+\))/)||[])[0]

const parse = ( value:string ):any[] => {
  const typeParams = parseTypeParams ( value )
  const typeName = parseTypeName ( value )
  const modifiers = value.replace(typeParams,'').split('.').slice(1)
  return [ typeName , modifiers , typeParams ]
}


export const mockContentFromString = ( selector:string ) => {
  const [ m , typeName , typeParams , ...modifiers ] = selector.match( /^(\w+)(\(.*\))?(\.\w+){0,}/ )
  return mockContent ( typeName , modifiers )
}

export const mockContentWithArgs = <T extends {}>( nodeType:string, data:T ) => {
  const [ type , ...modifiers ] = nodeType.split('.')
  const params = formatArgs (data)
  const mockedData = {
    cuid: cuid(params),
    locale: 'de_DE',
    type,
    modifiers
  }
  return mockedData
}

export const mockContent = ( value:string, modifiers:string[]=[] ) => {
  const [ typeName , typeModifiers=[] , typeParams='' ] = parse ( value )  
  const params = typeParams.slice(1,-1)
                    .split(';')
                    /*.map ( tupelSrc => tupelSrc.split('=') )
                    .map ( ([key,value]) => ({key, value}) )*/

  const data = { 
    type: typeName, 
    modifiers: modifiers.concat(typeModifiers).filter(v=>v) , 
    cuid: cuid(...params) , 
    locale: 'en_US'
  }
  const node = new KioContentModel ( data )
  /*const groupLabel = 'mock content for "'+typeName+'" (' + node.cuid + ')'
  console.groupCollapsed ( groupLabel )
  console.table ( data )
  console.groupEnd ()*/
  return node
}
/*
export const mockContentWithArgs = ( contentType:'src'|'txt', modifiers:string[], args:MockingParams ):KioContentModel => {
  return new KioContentModel({
    type: contentType, 
    cuid: cuid(formatArgs ( args )),
    modifiers
  })
}
*/