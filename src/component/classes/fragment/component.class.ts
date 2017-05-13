import { KioStructureType, KioChildContentType, KioCtnFragment, KioNodeType } from 'kio-ng2'
import { KioComponentStructure } from '../component.class'
import { ComponentFragmentStructure, ComponentStructure } from '../../interfaces/component'
import { ListQuery, QueryableAnnotation } from '../../../query/interfaces'


export class KioFragmentComponentStructure extends KioComponentStructure<KioCtnFragment> implements ComponentFragmentStructure {


  constructor(readonly modifiers:ListQuery<string>,readonly childTypes:ListQuery<QueryableAnnotation<KioChildContentType>>)
  {
    super(KioNodeType.fragment,modifiers)
  }
}