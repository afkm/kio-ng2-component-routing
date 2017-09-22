var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, ComponentFactoryResolver, Input, Output, EventEmitter, ReflectiveInjector, ViewChild, ViewContainerRef } from '@angular/core';
import { DataComponent } from '../base';
import { NODE_MODEL } from '../../node-model.token';
import { CONTENT_RESOLVER } from '../../content-resolver.token';
import { contentResolverFactory } from '../../resolver/content.factory';
import { defaultStore } from '../../classes/component-store';
import { createComponentItemOnViewContainer } from '../../factory';
var ComponentRouter = (function (_super) {
    __extends(ComponentRouter, _super);
    function ComponentRouter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.componentFactoryResolver = _this.injector.get(ComponentFactoryResolver);
        _this.viewParams = {};
        _this.mount = new EventEmitter();
        _this.unmount = new EventEmitter();
        return _this;
    }
    ComponentRouter.prototype.onNodeUpdate = function () {
        _super.prototype.onNodeUpdate.call(this);
        this.mountComponent();
    };
    ComponentRouter.prototype.unmountComponent = function () {
        if (this.mountedComponent) {
            this.log('unmounting component: %s', this.mountedComponent.instance);
            this.mountedComponent.destroy();
            this.mountedComponent = undefined;
            this.unmount.emit(null);
        }
    };
    ComponentRouter.prototype.createChildInjector = function () {
        return ReflectiveInjector.resolveAndCreate([{
                provide: NODE_MODEL,
                useValue: this.node
            },
            {
                provide: CONTENT_RESOLVER,
                useFactory: contentResolverFactory,
                deps: [NODE_MODEL]
            }
        ], this.injector);
    };
    ComponentRouter.prototype.mountComponent = function () {
        this.unmountComponent();
        var componentStructure = this._selectComponent();
        if (componentStructure) {
            this.componentIndex = defaultStore.indexOf(componentStructure);
            this.log('mounting component: %s', componentStructure.name);
            this.mountedComponent = createComponentItemOnViewContainer(componentStructure, this.componentFactoryResolver, this.mountPoint, this.node, this.viewParams);
            this.mount.emit(this.mountedComponent);
        }
        else {
            this.componentIndex = -1;
        }
    };
    ComponentRouter.prototype._selectComponent = function () {
        if (this.componentName) {
            return defaultStore.getComponentByName(this.componentName);
        }
        else {
            return defaultStore.getComponentForNode(this.node);
        }
    };
    return ComponentRouter;
}(DataComponent));
export { ComponentRouter };
ComponentRouter.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'component-router',
                templateUrl: './router.component.html'
            },] },
];
/** @nocollapse */
ComponentRouter.ctorParameters = function () { return []; };
ComponentRouter.propDecorators = {
    'cuid': [{ type: Input, args: ['cuid',] },],
    'componentName': [{ type: Input },],
    'viewParams': [{ type: Input },],
    'mount': [{ type: Output, args: ['mount',] },],
    'unmount': [{ type: Output, args: ['unmount',] },],
    'mountPoint': [{ type: ViewChild, args: ['mountPoint', { read: ViewContainerRef },] },],
    'mountPointElement': [{ type: ViewChild, args: ['mountPointElement',] },],
};
//# sourceMappingURL=router.component.js.map