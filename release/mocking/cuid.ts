const _cuid = require('cuid')

export const cuid = ( ...params:string[] ):string => {
  const prefixes = [ 'mock' , ...params ]  
  return '[' + prefixes.join('][')  + ']' + _cuid()
}