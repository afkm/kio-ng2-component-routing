interface Rect {
  left?:number
  top?:number
  right?:number
  bottom?:number
  height?:number
  width?:number
}

const makeRect = ( left:number , top:number , right:number , bottom:number ):Rect => {
  return {
    left,
    top,
    right,
    bottom,
    width: right-left,
    height: bottom-top
  }
}

const padRect = ( rectangle:Rect , padding:number ):Rect => {

  rectangle = Object.assign({},rectangle)
  rectangle.top += padding
  rectangle.left += padding
  rectangle.right -= padding
  rectangle.bottom -= padding

  return rectangle
}

const drawRect = ( context : CanvasRenderingContext2D , rectangle:Rect ):void => {
  context.beginPath()
  context.moveTo(rectangle.left,rectangle.top)
  context.lineTo(rectangle.right,rectangle.top)
  context.lineTo(rectangle.right,rectangle.bottom)
  context.lineTo(rectangle.left,rectangle.bottom)
  context.lineTo(rectangle.left,rectangle.top)
  context.closePath()
  context.stroke()
}

const drawCross = ( context : CanvasRenderingContext2D , rectangle:Rect ):void => {
  context.beginPath()
  context.moveTo(rectangle.left,rectangle.top)
  context.lineTo(rectangle.right,rectangle.bottom)
  context.moveTo(rectangle.right,rectangle.top)
  context.lineTo(rectangle.left,rectangle.bottom)
  context.stroke()
}

const drawText = ( context : CanvasRenderingContext2D , options?:any ):{(text:string|string[]):void} => {
  const {
    fontSize=17, //px!
    fontStyle='lighter',
    fontName='Helvetica',
    left=0,
    top=0
  } = options || {}

  context.font = `${fontSize}px ${fontName}`
  let offsetY = top+fontSize
  const drawLine = ( text:string|string[] ):void => {
    if ( Array.isArray ( text ) ) {
      text.map ( line => drawLine ( line ) )
      return
    }

    context.fillText(text,left+1,offsetY)

    offsetY+=fontSize
  }

  return drawLine
}

export function renderDataURL ( options:any ):string {
  const {
    width=640,
    height=480,
    filename="mocked-image",
    mimeType="image/jpeg",
    background="darkgray",
    foreground="#ffffff"
  } = options || {}

  const canvas : HTMLCanvasElement = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  //canvas.classList.add('dbg-canvas')
  //document.body.appendChild(canvas)
  const context : CanvasRenderingContext2D = canvas.getContext('2d')

  const rect = makeRect ( 0 , 0 , width , height )

  const padding:number = 10
  context.fillStyle = background
  context.fillRect(rect.left,rect.top,rect.right,rect.bottom)
  context.strokeStyle = foreground
  drawRect ( context , padRect ( rect , padding ) )
  drawCross ( context , padRect ( rect , padding*2 ) )
  context.fillStyle = foreground
  const drawLine = drawText ( context , { left: padding, top: padding } )
  
  drawLine ( 'filename: ' + filename )
  drawLine ( 'mimeType: ' + mimeType )
  drawLine ( 'width: ' + width )
  drawLine ( 'height: ' + height )
  

  const dataURL = canvas.toDataURL()
  return dataURL
}