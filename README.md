# kio-ng2-component-routing

provides base components and routing components, query logic and data interfaces


## RoutableComponent `decorator`

Example:

```typescript

import { RoutableComponent, FragmentDataComponent } from 'kio-ng2-component-routing'

@RoutableComponent({
  queryable: {
    type: 'fragment',
    modifiers: {
      contains: [ 'nba' ]
    },
    childTypes: [ 'txt', 'src', 'txt' ]
  },
  selector: 'publication-test',
  template: '<p>Hello Test</p>'
})
export class PublicationTestComponent {
    
}

```
  
  
**RoutableComponent** extends [Angular Component](https://angular.io/api/core/Component)

### Properties

#### queryable `ListQuery<T>`



## ListQuery

### all `method`

[source](./src/matching/assertion/list.ts)

`( filter:ValueFilter<any> ) => ( otherValues:any[] ):boolean `