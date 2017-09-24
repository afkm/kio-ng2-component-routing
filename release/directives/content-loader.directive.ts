import { 
  AfterViewInit, AfterContentInit, 
  OnChanges, SimpleChanges, SimpleChange, Directive, ElementRef, QueryList, ComponentRef, 
  Optional, Inject,
  ViewContainerRef, ViewChildren, ContentChildren, Host, Input, HostListener, Output, EventEmitter
} from '@angular/core'
import { ContentDataComponent } from '../components/base'
import { KioContentModel, KioFragmentModel } from 'kio-ng2-data'
import { ComponentContentResolver } from '../interfaces/content-resolver'
import { CONTENT_RESOLVER } from '../content-resolver.token'

@Directive({
  selector: '*',
  queries: {
    'childComponents': new ContentChildren(ContentLoaderDirective)
  }
})
export class ContentLoaderDirective implements OnChanges, AfterViewInit, AfterContentInit {

  constructor(
      @Optional() @Inject(CONTENT_RESOLVER) readonly contentResolver:ComponentContentResolver,
      public elementRef:ElementRef
    ){
    // this.logger.log('element',elementRef)
  }

  //readonly debug_cuid=cuid.slug()

  //@Input('ctn') node:KioContentModel
  @ViewChildren(ContentLoaderDirective)
  childComponents:QueryList<ContentLoaderDirective>

  @Output() events:EventEmitter<string>=new EventEmitter()

  emitEvent ( event:string ) {
    this.events.emit(event)
  }

  @HostListener('contentDataChanges',['$event']) onContentStateChanges ( e:any ) {
    // this.logger.log('onContentStateChanges',e)
  }

  setNodeData(value:any) {
    // this.logger.log('nodeData',value)
  }

  ngOnChanges ( changes:SimpleChanges ) {
    // this.logger.log('changes', Object.keys(changes))
  }

  ngAfterViewInit(){
    // this.logger.log('AfterViewInit',this)
  }

  ngAfterContentInit(){
    // this.logger.log('ngAfterContentInit',this)
  }


  /*protected logger=window.afkm.logger.cloneToScope(this,{
    labelStyle: {
      fontWeight: 'bold',
      fontSize: '19px'
    },
    label: this.debug_cuid
  })*/
}