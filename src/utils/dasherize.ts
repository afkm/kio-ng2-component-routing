
export function dasherize ( source:string ):string {

  function replaceMatch ( match:string, found:string, pos:number ) {
    if ( pos > 0 && found !== undefined ) {
      return '-'+match
    } else {
      return match
    }
  }

  return source
    .replace ( /([A-Z]{1}[a-z]+|[A-Z]{1,}$)?/g, replaceMatch )
    .split('-').map ( p => p.replace ( /([A-Z]+)/, replaceMatch ) )
    .join('-').toLowerCase()  
}