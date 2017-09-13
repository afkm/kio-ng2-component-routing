import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/window';
import { Injectable, Optional, Inject, EventEmitter } from '@angular/core';
import { CONTENT_RESOLVER } from '../content-resolver.token';
import { ComponentState } from '../enums/component-state.enum';
var ContentResolver = (function () {
    function ContentResolver(parentModel, parentResolver) {
        var _this = this;
        this.parentModel = parentModel;
        this.parentResolver = parentResolver;
        this.componentStateEmitter = new EventEmitter();
        this.componentStates = this.componentStateEmitter.asObservable().shareReplay();
        /** @type {Observable<Node<KioModel>>} observable of components which resolve their content data with this instance */
        this.childComponents = this.componentStates
            .skipWhile(function (value) { return value[1] < ComponentState.mounting; })
            .takeWhile(function (value) { return value[1] === ComponentState.mounting; }).map(function (v) { return v[0]; }).toArray();
        this.mounted = this.componentStates.filter(function (_a) {
            var c = _a[0], state = _a[1];
            return state === ComponentState.mounted;
        });
        this.mounting = this.componentStates.filter(function (_a) {
            var c = _a[0], state = _a[1];
            return state === ComponentState.mounting;
        });
        this.mountIntervals = this.mounting.windowToggle(this.mounting.map(function (_a) {
            var c = _a[0], state = _a[1];
            return state;
        }).distinctUntilChanged(), function (v) { return _this.mounted.take(1); }).concatMap(function (o) { return o.toArray(); });
        this.completed = this.childComponents
            .flatMap(function (childComponents) { return Observable.of.apply(Observable, childComponents); })
            .concatMap(function (childComponent) { return childComponent.componentState.skipWhile(function (value) { return value.currentValue < ComponentState.loaded; }).take(1); })
            .toArray().mapTo(true);
        // this.logger.log('created with parentModel', this.parentModel, 'parentResolver', this.parentResolver)
    }
    ContentResolver.prototype.updateComponentState = function (component, componentState) {
        // this.logger.log('updating component state of %s to %s', component, componentState, ComponentState[componentState])
        this.componentStateEmitter.emit([component, componentState]);
    };
    ContentResolver.prototype.subscribeTo = function (component, stateObservable) {
        var _this = this;
        // this.logger.log('subscribing to %s', component)
        return stateObservable.subscribe(function (componentState) { return _this.updateComponentState(component, componentState); });
    };
    return ContentResolver;
}());
export { ContentResolver };
//protected logger=window.afkm.logger.cloneToScope(this)
// private _debug_mounting=this.logger.observe(this,'mounting')
// private _debug_mounted=this.logger.observe(this,'mounted')
// private _debug_mountIntervals=this.logger.observe(this,'mountIntervals')
ContentResolver.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ContentResolver.ctorParameters = function () { return [
    null,
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CONTENT_RESOLVER,] },] },
]; };
//# sourceMappingURL=content.resolver.js.map