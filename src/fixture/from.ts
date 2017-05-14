import { 
  KioNodeType, KioChildContentType, 
  nodeType, nodeTypeByName, childNodeType, primitiveNodeType,
  KioPrimitiveContentType,
  isChildContentType, isPrimitiveContentType,
  isCtnFragment, isCtnSrc, isCtnTxt
} from 'kio-ng2'
import { ComponentFixture, ComponentFragmentFixture, ComponentNodeFixture } from './classes'

export function parseString <T extends KioNodeType.txt>( fixturePart:string ):ComponentNodeFixture<T>
export function parseString <T extends KioNodeType.src>( fixturePart:string ):ComponentNodeFixture<T>
export function parseString ( fixturePart:string ):ComponentFragmentFixture
export function parseString <T extends KioChildContentType>( fixturePart:string ):ComponentNodeFixture<KioNodeType.txt>|ComponentNodeFixture<KioNodeType.src>|ComponentFragmentFixture {
  const [ typeName, ...modifiers ] = fixturePart.split('.')

  if ( !isChildContentType(typeName) )
    return undefined

  if ( isCtnFragment(typeName) )
  {
    return new ComponentFragmentFixture(modifiers,[])
  }
  else if ( isCtnSrc(typeName) )
  {
    return new ComponentNodeFixture(KioNodeType.src,modifiers)
  }
  else if ( isCtnTxt(typeName) )
  {
    return new ComponentNodeFixture(KioNodeType.txt,modifiers)
  }
}


export function fromString <T extends KioNodeType.txt>( fixture:string ):ComponentNodeFixture<KioNodeType.txt>
export function fromString <T extends KioNodeType.src>( fixture:string ):ComponentNodeFixture<KioNodeType.src>
export function fromString <T extends KioChildContentType>( fixtures:string[] ):ComponentFragmentFixture
export function fromString <T extends KioChildContentType>( fixtures:string|string[] ):ComponentFragmentFixture|ComponentNodeFixture<KioNodeType.txt>|ComponentNodeFixture<KioNodeType.src> {
  if ( Array.isArray(fixtures) )
  {
    return new ComponentFragmentFixture([],fixtures.map( fixture => fromString(fixture) ))
  }
  else if ( 'string' === typeof fixtures )
  {
    if ( fixtures.split(' ').length > 1 )
    {
      return fromString ( fixtures.split(' ') )
    }

    const [ typeName, ...modifiers ] = fixtures.split('.')

    if ( !isChildContentType(typeName) )
      return undefined

    if ( isCtnFragment(typeName) )
    {
      return new ComponentFragmentFixture(modifiers,[])
    }
    else if ( isCtnSrc(typeName) )
    {
      return new ComponentNodeFixture(KioNodeType.src,modifiers)
    }
    else if ( isCtnTxt(typeName) )
    {
      return new ComponentNodeFixture(KioNodeType.txt,modifiers)
    }
  }
}