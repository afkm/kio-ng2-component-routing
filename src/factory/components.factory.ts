import { 
  Component, ComponentRef, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, Injector, ReflectiveInjector,
  Optional
} from '@angular/core'
import { KioNode, KioNodeModel, KioContentModel, KioFragment, KioFragmentModel, KioContentType, isNestedContentType, nodeType } from 'kio-ng2-data'
import { DataComponent, FragmentDataComponent, ContentDataComponent } from '../components/base'
import { NODE_MODEL } from '../node-model.token'
import { defaultStore } from '../classes/component-store'
import { CONTENT_RESOLVER } from '../content-resolver.token'
import { contentResolverFactory } from '../resolver/content.factory'

/*function isKioComponent ( other:any ):other is KioComponentChild {
  return ( 'node' in other )
}*/

function isFragmentNode ( other:any ):other is KioFragment {
  return ( 'object' === typeof other && 'type' in other && isNestedContentType(nodeType(other.type)) )
}

export function componentItemForNode ( node:KioContentModel|KioFragmentModel ) {
  return defaultStore.getComponentForNode ( node )
}


export function componentItemByName ( name:string ) {
  return defaultStore.getComponentByName(name)
}


export function createChildInjector ( node:KioContentModel|KioFragmentModel, parentInjector?:Injector ) :Injector {
  return ReflectiveInjector.resolveAndCreate([{
      provide: NODE_MODEL,
      useValue: node
    },
    {
      provide: CONTENT_RESOLVER,
      useFactory: contentResolverFactory,
      deps: [NODE_MODEL]
    }
  ],parentInjector)
}


export function createFactoryForComponentItem <T extends ContentDataComponent|FragmentDataComponent> ( factoryResolver:ComponentFactoryResolver, componentItem:any ):ComponentFactory<T> {
  return factoryResolver.resolveComponentFactory<T>(componentItem.component)
}

export function createComponentOnViewContainer  ( 
    factoryResolver:ComponentFactoryResolver, 
    viewContainer:ViewContainerRef, 
    data:KioContentModel|KioFragmentModel,
    viewParams:any={},
    parentInjector?:Injector
  ) {
  const componentItem = componentItemForNode(data)
  return createComponentItemOnViewContainer(componentItem, factoryResolver, viewContainer, data, viewParams, parentInjector)
}

export function createComponentItemOnViewContainer ( 
    componentItem:any, 
    factoryResolver:ComponentFactoryResolver, 
    viewContainer:ViewContainerRef, 
    data:KioContentModel|KioFragmentModel,
    viewParams:any={},
    parentInjector?:Injector
  ) {

  const factory = createFactoryForComponentItem(factoryResolver,componentItem)
  const injector = createChildInjector(data,parentInjector)
  const componentRef:ComponentRef<FragmentDataComponent|ContentDataComponent> = viewContainer.createComponent(factory,0,injector)
  componentRef.instance.viewParams = viewParams
  //componentLoader.setRootComponentRef(componentRef)
  return componentRef
}

