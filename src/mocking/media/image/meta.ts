import { KioImageMetaData, KioMediaType } from 'kio-ng2-data'

export function mockMetaForImage ( options?:any ) {
  const {
    width=640,
    height=480,
    filename="mocked-image",
    mimeType="image/jpeg"
  } = options || {}

  return {
    width ,
    height ,
    mimeType ,
    filename
  }
}