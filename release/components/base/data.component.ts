import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import { Input, Output, ContentChildren, Component, EventEmitter, ElementRef, 
  SimpleChanges, SimpleChange, OnInit, OnDestroy, OnChanges, Query,
  Injector,
  Optional,
  HostBinding, Host,
  ViewContainerRef,
  ContentChild,
  ComponentRef,
  ViewChild,
  AfterContentInit, AfterViewInit, ViewChildren, forwardRef, Inject, QueryList
} from '@angular/core'
import { KioContentModel, KioFragmentModel, KioPublicationModel, KioContentState } from 'kio-ng2-data'
import { ScrollService, ScrollDirection, ScrollMargin } from 'kio-ng2-scrolling'
import { DataDirective } from 'kio-ng2-ctn'
import { ContentLoaderDirective } from '../../directives/content-loader.directive'
import { NODE_MODEL } from '../../node-model.token'
import { CONTENT_RESOLVER } from '../../content-resolver.token'
import { ContentResolver } from '../../resolver/content.resolver'
import { contentResolverFactory } from '../../resolver/content.factory'
import { ComponentContentResolver } from '../../interfaces/content-resolver'
import { Node } from '../../interfaces/data-component'
import { StatefulComponent } from './stateful.component'
import { ComponentState } from '../../enums/component-state.enum'


@Component({
  moduleId: module.id,
  template: '',
  selector: 'data-component',
  providers: [
    /*{
      provide: CONTENT_RESOLVER,
      useFactory: contentResolverFactory,
      deps: [NODE_MODEL]
    },*/
    ContentLoaderDirective,
    DataDirective
  ]
})
export class DataComponent<T extends KioContentModel|KioFragmentModel|KioPublicationModel> extends StatefulComponent implements OnChanges, Node<T> {

  constructor(
      @Optional() @Host() @Inject(NODE_MODEL) protected node:T,
      @Optional() @Inject(CONTENT_RESOLVER) readonly contentResolver:ComponentContentResolver,
      @Inject(ScrollService) protected scrollService:ScrollService,
      readonly injector:Injector
    ) {
    super()

    if ( this.contentResolver ) {
      if ( !this.node ) {
        // is child component
        this.contentResolver.subscribeTo ( this, this.componentState.map(up => up.currentValue) )
      } else {
        this.contentResolver.completed.subscribe ( () => {
          this.log('COMPLETED LOADING')
        }, console.error, () => {
          this.log('all done')
        } )
      }
    } else {
      this.log('Was initialized without a content resolver.')
    }
  }
  
  /** observable of component state changes */
  
  protected outputNodeEmitter:EventEmitter<T>=new EventEmitter()

  @Input('node') inputNode:T
  @Output('node') 
  get outputNode() {
    return this.outputNodeEmitter.asObservable()
  }

  @Output() contentStateChanges:EventEmitter<SimpleChange>=new EventEmitter()
  contentState:KioContentState

  @Input()
  viewParams:any

  canAnimateContent:boolean=true

  protected didUpdate:boolean=false

  protected onNodeUpdate () {
    this.didUpdate = true
  }

  setData ( data:any ) {

  }

  setError ( error:Error ) {

  }

  protected onUpdate(){

  }


  onBeforeLoad(){
    //this.updateContentState(KioContentState.loading)
  }

  onAfterLoad () {
    //this.updateContentState(KioContentState.loaded)
  }

  ngOnInit(){
    //this.updateContentState(KioContentState.idle)
    super.ngOnInit()
  }

  ngOnDestroy(){
    super.ngOnDestroy()
  }

  ngOnChanges(changes:SimpleChanges){
    if ( 'inputNode' in changes ) {
      const nodeChange:SimpleChange = changes['inputNode']
      this.log('changed inputNode', nodeChange)
      if ( nodeChange.currentValue && (!nodeChange.firstChange || !this.node) ) {
        this.updateNode(nodeChange.currentValue)
      }
    }
  }

  ngAfterViewInit(){
    //this.log('ngAfterViewInit', this.childComponents)
    super.ngAfterViewInit()
    if ( this.didUpdate === false && this.node ) {
      process.nextTick(()=>{
        this.onNodeUpdate()
      })
    }
  }

  /** node lifecycle hook; called once the node property has been updated */

  protected updateNode ( nextNode:T ) {
    if ( this.node !== (nextNode||null) ) {
      this._assignNode(nextNode)
    }
  }

  /*protected log ( format:string, ...args:any[] ) {
    console.log( '%c%s (%s)%c '+format, 'color: orange; font-weight: bold;', this.constructor.name, this.debug_id, 'color: black; font-size: normal', ...args )
  }*/

  
  protected updateContentState ( nextState:KioContentState ) {
    if ( this.contentState !== nextState ) {
      const oldState = this.contentState
      this.contentState = nextState
      this.contentStateChanges.emit({
        currentValue: nextState,
        previousValue: oldState,
        firstChange: oldState === undefined,
        isFirstChange: () => oldState === undefined
      })
    }
  }

  private _assignNode ( node:T ) {
    process.nextTick(()=>{
      this.node = node
      this._emitNode(node)
    })
  }

  private _emitNode ( node:T ) {
    this.outputNodeEmitter.emit(node)
    this.onNodeUpdate()
  }

  /**
   * scroll handling
   */
  
  //protected scrollService:ScrollService
  protected _scrollServiceSubscription:Subscription
  
  protected startScrollTracking(scrollMargins:ScrollMargin[],element:ElementRef){
    
    if ( !this.scrollService ) {
      return
    }

    this._scrollServiceSubscription = this.scrollService.registerComponent(this,scrollMargins,element)
    .subscribe(
      ({positions, direction}) => {
        this.onScrollMarginUpdates(positions, direction)
      }
    )
  }

  protected stopScrollTracking(){
    if ( this._scrollServiceSubscription )
    {
      this._scrollServiceSubscription.unsubscribe()
      this._scrollServiceSubscription = null
    }
  }

  protected onScrollMarginUpdates ( positions:number[], direction?:ScrollDirection ) {
    //this.allMarginsVisible = positions.every(pos => pos >= 0 && pos <= 1)
  }


  protected componentStatesForContentState ( contentState:KioContentState ):ComponentState[] {
    const state = contentState

    let componentStates:ComponentState[]=[]

    switch ( state ) {
      case KioContentState.idle:
        componentStates.push(ComponentState.mounting)
        break;

      case KioContentState.loading:
        componentStates.push(ComponentState.mounted,ComponentState.loading)
        break;

      case KioContentState.loaded:
        componentStates.push(ComponentState.loaded)
        break;

      case KioContentState.unmounting:
        componentStates.push(ComponentState.unmounting)
        break;

    }

    return componentStates
  }

  private _contentStates=this.contentStateChanges.concatMap ( contentStateChange => {
    const componentStates = this.componentStatesForContentState(contentStateChange.currentValue)
    return Observable.of(...componentStates)
  } ).subscribe ( componentState => {
    if ( this.contentResolver ) {
      this.contentResolver.updateComponentState(this,componentState)
    }
  } )

}