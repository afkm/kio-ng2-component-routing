import { ValueTest } from './value-test'

export type valueFilter<T> = T|ValueTest<T>|T[]