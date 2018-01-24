import { 
  Component, ComponentFactoryResolver, Input, ViewEncapsulation,
  Output, EventEmitter, ComponentRef,
  Injector, ReflectiveInjector,
  OnChanges, SimpleChanges, SimpleChange, 
  ViewChild, ViewContainerRef, ElementRef
} from '@angular/core';
import { KioFragmentModel, KioContentModel } from 'kio-ng2-data'
import { DataComponent, FragmentDataComponent, ContentDataComponent } from '../base'
import { NODE_MODEL } from '../../node-model.token'
import { CONTENT_RESOLVER } from '../../content-resolver.token'
import { contentResolverFactory } from '../../resolver/content.factory'
import { defaultStore } from '../../classes/component-store'
import { OutlineService } from '../../services/outline.service'


import { createComponentOnViewContainer, componentItemByName, createComponentItemOnViewContainer } from '../../factory'

const Reflect = global['Reflect'];

@Component({
  moduleId: module.id,
  selector: 'component-router',
  templateUrl: './router.component.html'
})
export class ComponentRouter extends DataComponent<KioContentModel|KioFragmentModel> implements OnChanges {

  private outlineService:OutlineService=this.injector.get(OutlineService)

  private componentFactoryResolver:ComponentFactoryResolver=this.injector.get(ComponentFactoryResolver)

  /*@Input() 
  node:KioContentModel|KioFragmentModel*/

  @Input('cuid') cuid:string  
  
  @Input() componentName:string

  @Input() viewParams:any={}
  
  @Output('mount') 
  mount:EventEmitter<ComponentRef<any>>=new EventEmitter()

  @Output('unmount') 
  unmount:EventEmitter<null>=new EventEmitter()

  componentIndex:number
  
  @ViewChild('mountPoint', {read: ViewContainerRef})
  mountPoint:ViewContainerRef
  @ViewChild('mountPointElement')
  mountPointElement:ElementRef

  protected onNodeUpdate(){
    super.onNodeUpdate()
    this.mountComponent()
  }

  protected mountedComponent:ComponentRef<FragmentDataComponent|ContentDataComponent>

  protected unmountComponent ( ) { 
    if ( this.mountedComponent ) {
      this.log('unmounting component: %s', this.mountedComponent.instance)
      this.mountedComponent.destroy()
      this.mountedComponent = undefined
      this.unmount.emit(null)
    }
  }
  
  protected createChildInjector():Injector {
    return ReflectiveInjector.resolveAndCreate([{
        provide: NODE_MODEL,
        useValue: this.node
      },
      {
        provide: CONTENT_RESOLVER,
        useFactory: contentResolverFactory,
        deps: [NODE_MODEL]
      }
    ],this.injector)
  }

  protected mountComponent ( ) {
    this.unmountComponent()

    const componentStructure = this._selectComponent ()
    if ( componentStructure ) {
      this.componentIndex = defaultStore.indexOf ( componentStructure )
      this.log('mounting component: %s', componentStructure.name )
      this.mountedComponent = createComponentItemOnViewContainer(componentStructure,this.componentFactoryResolver,this.mountPoint,this.node,this.viewParams)
      const annotation:any = (Reflect.getMetadata('annotations',componentStructure.component)||[]).find ( annotation => {
        return annotation instanceof Component
      } )
      const children = (this.node instanceof KioFragmentModel) ? this.node.children.slice() : []
      this.outlineService.registerNode(this.node,annotation.selector)
      this.mount.emit(this.mountedComponent)
    } else {
      this.componentIndex = -1
    }
  }


  private _selectComponent ( ) {
    if ( this.componentName ) {
      return defaultStore.getComponentByName ( this.componentName )
    } else {
      return defaultStore.getComponentForNode ( this.node )
    }
  }

}
