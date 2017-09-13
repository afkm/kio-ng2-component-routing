import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import { EventEmitter, SimpleChange, OnInit, OnDestroy, AfterViewInit } from '@angular/core'
import { ComponentState } from '../../enums/component-state.enum'
import * as cuid from 'cuid'

export class StatefulComponent implements OnInit, OnDestroy, AfterViewInit {

  readonly debug_id=cuid.slug()

  private _changeEmitter:EventEmitter<SimpleChange>=new EventEmitter()

  /** current component state */
  public get currentComponentState():ComponentState {
    return this._state
  }

  /** observable of component state changes */
  public componentState:Observable<SimpleChange>=this._changeEmitter.asObservable()

  private _state:ComponentState
  
  ngOnInit () {
    this.updateComponentState ( ComponentState.mounting )
  }
  
  ngOnDestroy () {
    this.updateComponentState ( ComponentState.unmounting )
  }

  ngAfterViewInit () {
    this.updateComponentState ( ComponentState.mounted )
  }

  protected updateComponentState ( nextState:ComponentState|keyof typeof ComponentState ) {
    if ( 'string' === typeof nextState ) {
      return this.updateComponentState ( ComponentState[nextState] )
    }
    if ( this._state !== nextState ) {
      this.log('update state from %s to %s', ComponentState[this._state], ComponentState[nextState])
      const oldState = this._state
      this._state = nextState
      this._changeEmitter.emit({
        currentValue: nextState,
        previousValue: oldState,
        firstChange: oldState === undefined,
        isFirstChange: () => oldState === undefined
      })
    }
  }


  protected logger=window.afkm.logger.cloneToScope(this,{
    time: false,
    labelStyle: {
      color: '#33f9e1'
    }
  })
  
  protected log ( format:string, ...args:any[] ) {
    this.logger.log(format, ...args)
  }

}