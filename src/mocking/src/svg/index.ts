import { mockFragment, mockContentFromString, mockContent, cuid } from '../../'
import { SVGMapBackground, SVGMapLayer } from './Map'
export { SVGMapBackground, SVGMapLayer }


export const createMapLayer = ( caption:string , mods:string[]=[] ) => {
  const txt = mockContent(`txt(text=${caption})`)
  const src = mockContent(`src(url=${SVGMapLayer})`,['svg','layer',...mods])
  return mockFragment ( [txt,src], ['canvas-layer'] )
}

export const createMap = ( layerCaptions:string[] ) => {
  return mockFragment ( [
      mockContent('txt(text=Follow the journeys)'),
      mockContent(`src(url=${SVGMapBackground})`),
      mockFragment (
        layerCaptions.map ( caption => createMapLayer ( caption ) )
      )
    ] , ['canvas'] )
}