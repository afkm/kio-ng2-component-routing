import { ValueTest } from './value-test'
import { valueMatcher } from './value.matcher'

export interface numberMatcher extends valueMatcher<number> {
  (value:number):ValueTest<number>
}
