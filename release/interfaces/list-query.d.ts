import { ValueQuery } from './value-query';
import { numberMatcher } from './number.matcher';
import { valueFilter } from './value-filter';
export interface ListQuery<T> extends ValueQuery<T> {
    length?: numberMatcher | number;
    contains?: valueFilter<T>;
    containsNot?: valueFilter<T>;
    all?: valueFilter<T>;
    deepEqual?: T[];
    either?: T[];
}
