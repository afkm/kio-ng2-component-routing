var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import { Component } from '@angular/core';
import { defaultStore } from '../classes/component-store';
import { inheritAnnotation } from './inherit';
var Reflect = global['Reflect'];
export function RoutableComponent(annotation) {
    var queryable = annotation.queryable, component = __rest(annotation, ["queryable"]);
    if (annotation.template && annotation.templateUrl) {
        annotation.template = undefined;
    }
    var componentAnnotation = Component(component);
    //window.afkm.logger.log('decorate queryable',queryable,'on',component)
    return function decorateConstructor(instance) {
        var parentTarget = Object.getPrototypeOf(instance.prototype).constructor;
        var parentAnnotations = Reflect.getMetadata('annotations', parentTarget);
        var parentParamTypes = Reflect.getMetadata('design:paramtypes', parentTarget);
        var parentPropMetadata = Reflect.getMetadata('propMetadata', parentTarget);
        var parentParameters = Reflect.getMetadata('parameters', parentTarget);
        var targetAnnotations = Reflect.getMetadata('annotations', instance);
        //componentAnnotation(instance)
        var parentAnnotation = parentAnnotations ? parentAnnotations[0] : {};
        /*if ( 'providers' in parentAnnotation ) {
            window.afkm.logger.log('providers in parentAnnotation', parentAnnotation.providers )
        }*/
        if (queryable) {
            defaultStore.registerComponent(component.selector, queryable, instance);
        }
        //console.groupCollapsed(`@${component.selector}`)
        // window.afkm.logger.log('parentAnnotations',parentAnnotations)
        // window.afkm.logger.log('parentParamTypes',parentParamTypes)
        // window.afkm.logger.log('parentPropMetadata',parentPropMetadata)
        // window.afkm.logger.log('parentParameters',parentParameters)
        // window.afkm.logger.log('targetAnnotations before decoration',targetAnnotations)
        targetAnnotations = Reflect.getMetadata('annotations', instance);
        var inheritedTargetAnnotation = inheritAnnotation(parentAnnotation, component);
        if (('template' in inheritedTargetAnnotation) && ('templateUrl' in inheritedTargetAnnotation)) {
            inheritedTargetAnnotation.template = undefined;
        }
        var metadata = new Component(inheritedTargetAnnotation);
        Reflect.defineMetadata('annotations', [metadata], instance);
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
        return instance;
    };
}
//# sourceMappingURL=component.decorator.js.map