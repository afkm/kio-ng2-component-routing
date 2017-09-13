import { ReflectiveInjector } from '@angular/core';
import { isNestedContentType, nodeType } from 'kio-ng2-data';
import { NODE_MODEL } from '../node-model.token';
import { defaultStore } from '../classes/component-store';
import { CONTENT_RESOLVER } from '../content-resolver.token';
import { contentResolverFactory } from '../resolver/content.factory';
/*function isKioComponent ( other:any ):other is KioComponentChild {
  return ( 'node' in other )
}*/
function isFragmentNode(other) {
    return ('object' === typeof other && 'type' in other && isNestedContentType(nodeType(other.type)));
}
export function componentItemForNode(node) {
    return defaultStore.getComponentForNode(node);
}
export function componentItemByName(name) {
    return defaultStore.getComponentByName(name);
}
export function createChildInjector(node, parentInjector) {
    return ReflectiveInjector.resolveAndCreate([{
            provide: NODE_MODEL,
            useValue: node
        },
        {
            provide: CONTENT_RESOLVER,
            useFactory: contentResolverFactory,
            deps: [NODE_MODEL]
        }
    ], parentInjector);
}
export function createFactoryForComponentItem(factoryResolver, componentItem) {
    return factoryResolver.resolveComponentFactory(componentItem.component);
}
export function createComponentOnViewContainer(factoryResolver, viewContainer, data, viewParams, parentInjector) {
    if (viewParams === void 0) { viewParams = {}; }
    var componentItem = componentItemForNode(data);
    return createComponentItemOnViewContainer(componentItem, factoryResolver, viewContainer, data, viewParams, parentInjector);
}
export function createComponentItemOnViewContainer(componentItem, factoryResolver, viewContainer, data, viewParams, parentInjector) {
    if (viewParams === void 0) { viewParams = {}; }
    var factory = createFactoryForComponentItem(factoryResolver, componentItem);
    var injector = createChildInjector(data, parentInjector);
    var componentRef = viewContainer.createComponent(factory, 0, injector);
    componentRef.instance.viewParams = viewParams;
    //componentLoader.setRootComponentRef(componentRef)
    return componentRef;
}
//# sourceMappingURL=components.factory.js.map