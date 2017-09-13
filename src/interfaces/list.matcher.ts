import { ValueTest } from './value-test'

export interface listMatcher<T> {
  ( value:T, invert?:boolean ):ValueTest<T[]>
}

