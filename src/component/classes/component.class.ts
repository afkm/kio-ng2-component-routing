import { KioChildContentType } from 'kio-ng2'
import { ComponentStructure } from '../interfaces/component'
import { ListQuery } from '../../query/interfaces'


export class KioComponentStructure <T extends KioChildContentType> implements ComponentStructure<T> {

  constructor(readonly type:T,readonly modifiers:ListQuery<string>)
  {
  }

}