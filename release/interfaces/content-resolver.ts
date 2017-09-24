import { ComponentRef } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { ComponentState } from '../enums/component-state.enum'
import { ComponentData } from '../types/component-data'
import { Node, Collection, Data, Stateful } from './data-component'


export interface ComponentContentResolver  {

  readonly parentModel:any

  componentStates:Observable<[Node<ComponentData>,ComponentState]>
  childComponents:Observable<Node<ComponentData>[]>

  completed:Observable<boolean>

  updateComponentState ( component:Node<ComponentData>, componentState:ComponentState ):void

  subscribeTo ( component:Node<ComponentData>, stateObservable:Observable<ComponentState> ):Subscription

}