import { 
  KioNodeType, KioChildContentType
} from 'kio-ng2'


export class ComponentFixture<T extends KioChildContentType> {

  constructor(
    readonly type:T,
    readonly modifiers:string[]
  ){}

}