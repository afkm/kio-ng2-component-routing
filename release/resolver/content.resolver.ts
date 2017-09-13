import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/window'
import { Injectable, Optional, ComponentRef, Inject, EventEmitter } from '@angular/core'
import { NODE_MODEL } from '../node-model.token'
import { CONTENT_RESOLVER } from '../content-resolver.token'
import { KioContentModel, KioFragmentModel, KioPublicationModel } from 'kio-ng2-data'
import { ComponentContentResolver } from '../interfaces/content-resolver'
import { Data, Node } from '../interfaces/data-component'
import { ComponentState } from '../enums/component-state.enum'



@Injectable()
export class ContentResolver {

  constructor(
    readonly parentModel:KioFragmentModel|KioPublicationModel,
    @Optional() @Inject(CONTENT_RESOLVER) readonly parentResolver?:ComponentContentResolver
    ) {
    // this.logger.log('created with parentModel', this.parentModel, 'parentResolver', this.parentResolver)
  }

  protected componentStateEmitter:EventEmitter<[Node<KioContentModel|KioFragmentModel>,ComponentState]>=new EventEmitter()
  
  public componentStates=this.componentStateEmitter.asObservable().shareReplay()

  /** @type {Observable<Node<KioModel>>} observable of components which resolve their content data with this instance */
  public childComponents:Observable<Node<KioContentModel|KioFragmentModel>[]>=this.componentStates
    .skipWhile((value)=> value[1] < ComponentState.mounting )
    .takeWhile((value) => value[1] === ComponentState.mounting ).map ( v => v[0] ).toArray()


  protected mounted=this.componentStates.filter ( ([c,state]) => state === ComponentState.mounted )
  protected mounting=this.componentStates.filter ( ([c,state]) => state === ComponentState.mounting )

  protected mountIntervals=this.mounting.windowToggle(
    this.mounting.map ( ([c,state]) => state ).distinctUntilChanged(),
    ( v ) => this.mounted.take(1)
  ).concatMap ( o => o.toArray() )

  public completed=this.childComponents
    .flatMap ( childComponents => Observable.of(...childComponents) )
    .concatMap ( childComponent => childComponent.componentState.skipWhile( value => value.currentValue < ComponentState.loaded ).take(1) )
    .toArray().mapTo(true)

  updateComponentState ( component:Node<KioContentModel|KioFragmentModel>, componentState:ComponentState ) {
    // this.logger.log('updating component state of %s to %s', component, componentState, ComponentState[componentState])
    this.componentStateEmitter.emit([component,componentState])
  }

  subscribeTo ( component:Node<KioContentModel|KioFragmentModel>, stateObservable:Observable<ComponentState> ) {
    // this.logger.log('subscribing to %s', component)
    return stateObservable.subscribe ( componentState => this.updateComponentState ( component, componentState ) )
  }

  //protected logger=window.afkm.logger.cloneToScope(this)

  // private _debug_mounting=this.logger.observe(this,'mounting')
  // private _debug_mounted=this.logger.observe(this,'mounted')
  // private _debug_mountIntervals=this.logger.observe(this,'mountIntervals')


}