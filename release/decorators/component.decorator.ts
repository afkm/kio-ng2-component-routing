import { ComponentDecorator, Component, Inject } from '@angular/core'
import { KioContentModel, KioFragmentModel } from 'kio-ng2-data'
import { ComponentAnnotation } from '../interfaces/component-annotation'
import { FragmentAnnotation, ContentAnnotation, DataType, ContentType, Annotation } from '../interfaces/annotation'
import { DataComponent, FragmentDataComponent, ContentDataComponent } from '../components/base'
import { ContentLoaderDirective } from '../directives/content-loader.directive'
import { defaultStore } from '../classes/component-store'

import { inheritAnnotation } from './inherit'

const Reflect = global['Reflect'];

export type ConstructorOf<T> = {
    new (...args:any[]):T
}

export type DataComponentType<T extends KioContentModel|KioFragmentModel> = {
  new (...args:any[]):DataComponent<T>
}

export function RoutableComponent ( annotation:any ) 
{
  const {
    queryable,
    ...component
  } = annotation

  if ( annotation.template && annotation.templateUrl ) {
      annotation.template = undefined
  }

  const componentAnnotation = Component(component)
  //window.afkm.logger.log('decorate queryable',queryable,'on',component)
  return function decorateConstructor <T1 extends ConstructorOf<FragmentDataComponent>|ConstructorOf<ContentDataComponent>> ( instance:T1 ):T1
  {
    var parentTarget = Object.getPrototypeOf(instance.prototype).constructor;
    var parentAnnotations = Reflect.getMetadata('annotations', parentTarget);
    var parentParamTypes = Reflect.getMetadata('design:paramtypes', parentTarget);
    var parentPropMetadata = Reflect.getMetadata('propMetadata', parentTarget);
    var parentParameters = Reflect.getMetadata('parameters', parentTarget);

    var targetAnnotations = Reflect.getMetadata('annotations', instance);
    //componentAnnotation(instance)


    const parentAnnotation:any = parentAnnotations ? parentAnnotations[0] : {}

    /*if ( 'providers' in parentAnnotation ) {
        window.afkm.logger.log('providers in parentAnnotation', parentAnnotation.providers )
    }*/

    if ( queryable ) {
        defaultStore.registerComponent( component.selector, queryable, instance )
    }

    //console.groupCollapsed(`@${component.selector}`)
    // window.afkm.logger.log('parentAnnotations',parentAnnotations)
    // window.afkm.logger.log('parentParamTypes',parentParamTypes)
    // window.afkm.logger.log('parentPropMetadata',parentPropMetadata)
    // window.afkm.logger.log('parentParameters',parentParameters)
    
    // window.afkm.logger.log('targetAnnotations before decoration',targetAnnotations)
    targetAnnotations = Reflect.getMetadata('annotations', instance);

    var inheritedTargetAnnotation = inheritAnnotation ( parentAnnotation, component )
    
    if ( ('template' in inheritedTargetAnnotation) && ('templateUrl' in inheritedTargetAnnotation) ) {
        inheritedTargetAnnotation.template = undefined
    }

    var metadata = new Component(inheritedTargetAnnotation)
    Reflect.defineMetadata('annotations', [ metadata ], instance);
    var targetParamTypes = Reflect.getMetadata('design:paramtypes', instance);
    var targetPropMetadata = Reflect.getMetadata('propMetadata', instance);
    var targetParameters = Reflect.getMetadata('parameters', instance);
    
    //console.group('target')
    // window.afkm.logger.log('targetAnnotations',targetAnnotations)
    // window.afkm.logger.log('targetParamTypes',targetParamTypes)
    // window.afkm.logger.log('targetPropMetadata',targetPropMetadata)
    // window.afkm.logger.log('targetParameters',targetParameters)
    //console.groupEnd()
    

    // window.afkm.logger.log('decorate queryable',queryable)
    //console.groupCollapsed('instance')
    // window.afkm.logger.log(instance)
    //console.groupEnd()
    //console.groupEnd()
    return instance
  }
}