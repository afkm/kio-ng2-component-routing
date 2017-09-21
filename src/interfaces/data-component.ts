import { SimpleChange } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { ComponentContentResolver } from './content-resolver'
import { ComponentState } from '../enums/component-state.enum'
import { KioContentState, KioContentModel, KioFragmentModel, KioPublicationModel } from 'kio-ng2-data'
import { ComponentData } from '../types/component-data'

export interface Stateful {

  currentComponentState:ComponentState

  componentState:Observable<SimpleChange>

}

export interface Node <T extends ComponentData> extends Stateful {

  readonly contentResolver:ComponentContentResolver

  inputNode:T
  outputNode:Observable<T>

  viewParams:any
  canAnimateContent:boolean
}

export interface Data <D> extends Node <KioContentModel> {

  onData:Observable<D>
  contentStateChanges:Observable<SimpleChange>

  data:D

  setData ( data:D ):void

  setError ( error:Error ):void

  onBeforeLoad ():void
  onAfterLoad ():void
}

export interface Collection <T extends ComponentData,C> {

  childComponents:Observable<C>

}