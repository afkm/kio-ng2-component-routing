const _cuid = require('cuid')

export function cuid ( ...params:string[] ):string {
  const prefixes = [ 'mock' , ...params ]  
  return '[' + prefixes.join('][')  + ']' + _cuid()
}