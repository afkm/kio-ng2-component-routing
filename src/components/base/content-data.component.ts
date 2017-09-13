import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/interval'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/delay'
//import 'rxjs/add/operator/mergeMap'
import { Component, Input, EventEmitter, Output, Inject, SimpleChanges, SimpleChange, OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentInit } from '@angular/core'
import { KioContentModel, KioContentState } from 'kio-ng2-data'
import { BackendService } from 'kio-ng2-ctn'
import { ContentLoaderDirective } from '../../directives/content-loader.directive'
import { DataComponent } from './data.component'
import { ComponentState } from '../../enums/component-state.enum'

export class ContentDataComponent extends DataComponent<KioContentModel> implements OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentInit {

  readonly node:KioContentModel

  protected backend:BackendService=this.injector.get(BackendService)

  @Input() viewParams:any={}
  @Output() onData:EventEmitter<any>=new EventEmitter()

  data:any

  setData ( data:any ) {
    if ( this.data !== data ) {
      this.data = data
      this.onData.emit(data)
      this.onUpdate()
    }
  }

  setError ( error:Error ) {

  }

  protected onUpdate(){

  }

  /** data lifecycle hook; called before data will be loaded with backend service */
  onBeforeLoad(){
    this.updateContentState(KioContentState.loading)
  }

  /** data lifecycle hook; called after data was loaded with backend service */
  onAfterLoad () {
    this.updateContentState(KioContentState.loaded)
  }

  ngOnInit(){
    super.ngOnInit()    
    this.updateContentState(KioContentState.idle)
  }

  ngOnDestroy(){
    this._contentStateChanges_debug.unsubscribe()
    super.ngOnDestroy()
  }

  ngAfterContentInit(){

  }

  protected onNodeUpdate () {
    this.log('onNodeUpdate')
    super.onNodeUpdate()
    if ( this.node ) {
      this.log('Loading content')
      this.loadNodeContent()
    }
  }


  protected loadNodeContent ( ) {
    this.onBeforeLoad()
    this.backend.loadNodeContent ( this.node, {} ).subscribe ( response => {
      this.setData ( response.data )
      this.onAfterLoad()
    } )
  }

  protected logger=Object.assign(this.logger,{
    options: {
      ...this.logger.options,
      sourceUrl: true
    }
  })

  private _contentStateChanges_debug=window.afkm.logger.observe(this,'contentStateChanges',(subj,prop,value:KioContentState,idx)=>{
    return `content state: ${value} - "${KioContentState[value]}"`
  })
}