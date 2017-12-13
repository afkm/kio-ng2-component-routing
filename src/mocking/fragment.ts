import { KioFragmentModel } from 'kio-ng2-data'
import { cuid } from './cuid'
import { mockContentFromString } from './content'

export function mockFragment ( children:any[], modifiers:string[]=[] ):KioFragmentModel {
  return new KioFragmentModel ( {
    cuid: cuid() ,
    modifiers ,
    children: children.map ( (child:any) => {
      if ( child.isKioNode )
        return child

      if ( Array.isArray ( child ) )
      {
        return mockFragment ( child[0], child[1] )
      }
      return mockContentFromString ( child )
    } )
  } )
}