
export function inheritAnnotation ( parentAnnotation:any, childAnnotation:any ) {
  const out:any = Object.assign({},childAnnotation)
  Object.keys(parentAnnotation).forEach ( key => {
    if ( !childAnnotation.hasOwnProperty(key) ) {
      out[key] = parentAnnotation[key]
    }
  } )  
  return out
}