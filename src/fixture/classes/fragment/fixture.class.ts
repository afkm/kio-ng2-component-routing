import {
  KioNodeType ,
  KioChildContentType ,
  nodeType
} from 'kio-ng2'
import { ComponentFixture } from '../fixture.class'


export class ComponentFragmentFixture extends ComponentFixture<KioNodeType.fragment> {

  constructor(readonly modifiers:string[],readonly childTypes:ComponentFixture<KioChildContentType>[]){
    super(KioNodeType.fragment,modifiers)
  }

  
}