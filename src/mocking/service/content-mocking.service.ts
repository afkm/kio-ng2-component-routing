import { KioNode, KioNodeModel, KioContentModel, KioFragmentModel,
 KioChildContentType, KioNodeType,
 isCtnFragment, isCtnSrc, isCtnTxt, isCtnPublication
} from 'kio-ng2'
import * as _ from 'lodash'
import { KioTxtData, KioSrcData } from 'kio-ng2'
import { renderDataForNode } from '../media'
import * as store from '../../store'

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
  const z = _.zip(...params)
  return _.zipObject(z[0],z[1])
}

export class ContentMockingService {

  constructor() { }

  getFixtureForComponent ( componentName : string ) : any {
    const item = store.getComponentByName(componentName)
    let mockedData : any = item ? item.fixture : null
    if ( !mockedData )
      return null

    if ( isCtnFragment(mockedData.type) )
    {
      mockedData = new KioFragmentModel ( mockedData )
    }
    else if ( isCtnSrc (mockedData.type) )
    {
      mockedData = new KioContentModel <KioNodeType.src>( mockedData, undefined )
    }
    else if ( isCtnTxt (mockedData.type) )
    {
      mockedData = new KioContentModel <KioNodeType.txt>( mockedData, undefined )
    }
    this.fillContent ( mockedData )
    return mockedData
  }

  fillContent ( node : any ) {

    if ( node.type === 'fragment' )
    {
      (node.children||[]).forEach ( childNode => {
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

  mockContentData <T extends KioChildContentType>( node : KioNode<T>, params:MockedData={} ):any {
    const mockedData = parseMockingArgs ( node.cuid ) || {}
    params = {...params , ...mockedData }
    if ( isCtnTxt(node.type) )
    {
      return {
        text: 'Lorem ipsum Eiusmod mollit dolor ut irure incididunt exercitation aliqua proident anim minim velit dolor voluptate commodo incididunt eu et proident commodo proident eu nostrud Duis ea nisi non.',
        ...params
      }
    }
    return renderDataForNode ( node , params ) || params || {}
  }

}
