import { mockMetaForImage as mockMeta } from './meta'
import { renderDataURL } from './data'

export const matchNode = ( node:any ) => {
  return node.type === 'src' && (node.modifiers.indexOf ( 'image' ) > -1 || node.modifiers.indexOf ( 'img' ) > -1)
}

export { mockMeta , renderDataURL }