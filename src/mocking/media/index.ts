import * as imageType from './image'

const mediaTypes = [
  { name: 'image' , type: imageType }
]

export function renderDataForNode ( node:any , params:any ) {

  const mediaType = mediaTypes.find ( mediaType => mediaType.type.matchNode ( node ) )
  if ( mediaType )
  {
    const meta = mediaType.type.mockMeta(Object.assign({},params,{filename: node.cuid}))
    return {
      meta: meta ,
      url: mediaType.type.renderDataURL(meta)
    }
  }
  return undefined

}