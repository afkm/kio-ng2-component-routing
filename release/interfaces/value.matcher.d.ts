import { ValueTest } from './value-test';
export interface valueMatcher<T> {
    (value: T): ValueTest<T>;
}
