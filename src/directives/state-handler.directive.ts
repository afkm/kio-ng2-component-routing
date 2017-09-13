import { 
  AfterViewInit, AfterContentInit, 
  OnChanges, SimpleChanges, SimpleChange, Directive, ElementRef, QueryList, ComponentRef, 
  Optional, Inject,
  ViewContainerRef, ViewChildren, ContentChildren, Host, Input, HostListener, Output, EventEmitter
} from '@angular/core'
import * as cuid from 'cuid'

@Directive({
  selector: '*',
  queries: {
    'childComponents': new ContentChildren(StateHandlerDirective)
  }
})
export class StateHandlerDirective {

  @ViewChildren(StateHandlerDirective)
  childComponents:QueryList<StateHandlerDirective>

  

  readonly debug_cuid=cuid.slug()

  protected logger=window.afkm.logger.cloneToScope(this,{
    labelStyle: {
      fontWeight: 'bold',
      fontSize: '14px'
    },
    label: this.debug_cuid
  })


}