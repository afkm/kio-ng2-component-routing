import { KioNode, KioNodeModel, KioContentModel, KioFragmentModel } from 'kio-ng2-data'
const _zip = require('lodash.zip')
const _zipObject = require('lodash.zipobject')
import { KioTxtData, KioSrcData } from 'kio-ng2-data'
import { renderDataForNode } from '../media'
import { defaultStore } from '../../classes/component-store'

export interface MockedData {
  [key:string]: any;
}

const parseMockingArgs = ( cuid:string ):MockedData => {
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
  const z = _zip(...params)
  return _zipObject(z[0],z[1])
}

export class ContentMockingService {

  constructor() { }

  getFixtureForComponent ( componentName : string ) : any {
    const item = defaultStore.getComponentByName(componentName)
    
    let mockedData : any = item ? item.fixture : null
    if ( !mockedData )
      return null

    if ( mockedData.type === 'fragment' )
    {
      mockedData = new KioFragmentModel ( mockedData )
    }
    else 
    {
      mockedData = new KioContentModel ( mockedData )
    }
    this.fillContent ( mockedData )
    return mockedData
  }

  fillContent ( node : any ) {

    if ( node.type === 'fragment' )
    {
      (node.children||[]).forEach ( (childNode:KioFragmentModel|KioContentModel):void => {
        this.fillContent ( childNode )
      } )
    }
    else 
    {
      node.data = this.mockContentData ( node )
    }

  }

  mockLoadNodeContent ( node : any , params:any={} ) {

    node.data = this.mockContentData ( node , params )

  }

  mockContentData ( node : KioNode, params:MockedData={} ):any {
    const mockedData = parseMockingArgs ( node.cuid ) || {}
    params = {...params , ...mockedData }
    if ( node.type === 'txt' )
    {
      return {
        text: 'Lorem ipsum Eiusmod mollit dolor ut irure incididunt exercitation aliqua proident anim minim velit dolor voluptate commodo incididunt eu et proident commodo proident eu nostrud Duis ea nisi non.',
        ...params
      }
    }
    return renderDataForNode ( node , params ) || params || {}
  }

}
