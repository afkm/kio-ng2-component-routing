import { KioNode } from 'kio-ng2-data'

import { cuid } from './cuid'
/**
 * arg = ['txt.heading','src.image']
 * arg = ['txt.heading',['src.big-image','txt.paragraph']]
 */

export const mockNodeOfType = ( nodeType:string, children:string[]=[] ):KioNode => {

  const [ type , ...modifiers ] = nodeType.split('.')

  const mockedNode : any = {
    cuid: cuid(), 
    locale: 'en_US' ,
    type ,
    modifiers
  }
  if ( children.length > 0 )
  {
    mockedNode.children = children.map ( child => mockType ( child ) )
  }
  else if ( type === 'txt' )
  {
    mockedNode.cuid = '[mock]' + mockedNode.cuid
  }
  return mockedNode
}

export const mockType = ( value:string|any[], children?:string[] ):KioNode => {
  let node
  if ( 'string' === typeof value )
  {
    node = mockNodeOfType ( value , children )
  }
  else if ( Array.isArray ( value ) )
  {
    node = mockNodeOfType ( 'fragment' , value )
  }

  /*console.group('mocked node')
  console.log ( '%c%s' , 'font-weight: bold; color: green; font-size: 14px' , value )
  console.log ( 'children' , children )
  console.log ( 'result' , node )
  console.groupEnd()*/

  return node
}