import { 
  AfterViewInit, AfterContentInit, 
  OnChanges, SimpleChanges, SimpleChange, Directive, ElementRef, QueryList, ComponentRef, 
  Optional, Inject,
  ViewContainerRef, ViewChildren, ContentChildren, Host, Input, HostListener, Output, EventEmitter
} from '@angular/core'

@Directive({
  selector: '*',
  queries: {
    'childComponents': new ContentChildren(StateHandlerDirective)
  }
})
export class StateHandlerDirective {

  @ViewChildren(StateHandlerDirective)
  childComponents:QueryList<StateHandlerDirective>

}