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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { Component, ViewContainerRef, ViewChildren } from '@angular/core';
import { DataComponent } from './data.component';
import { ContentLoaderDirective } from '../../directives/content-loader.directive';
import { isData } from '../../typechecks';
import { ComponentState } from '../../enums/component-state.enum';
var FragmentDataComponent = (function (_super) {
    __extends(FragmentDataComponent, _super);
    function FragmentDataComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.childElements = _this.contentResolver.childComponents
            .map(function (childs) {
            return childs.filter(function (child) {
                return child !== _this;
            });
        });
        _this.childElementsLoaded = _this.childElements
            .flatMap(function (childComponents) {
            _this.log('wait for %s child components to load', childComponents.length, childComponents);
            return Observable.of.apply(Observable, childComponents).mergeMap(function (childComponent) { return childComponent.componentState.map(function (state) { return [childComponent, state.currentValue]; }); });
        })
            .filter(function (_a) {
            var component = _a[0], state = _a[1];
            return state >= ComponentState.loaded;
        })
            .map(function (_a) {
            var component = _a[0], state = _a[1];
            return component;
        });
        //private 
        _this._childDataComponentStates = _this.childElements.flatMap(function (childComponents) {
            return childComponents.filter(function (childComponent) {
                return isData(childComponent);
            });
        })
            .flatMap(function (childComponent) { return _this.contentResolver.componentStates.filter(function (_a) {
            var component = _a[0], state = _a[1];
            return component === childComponent;
        }); });
        _this._childContentStates = _this.childElementsLoaded
            .subscribe(function (childComponent) {
            _this.log('loaded child component', childComponent);
        }, function (error) {
            console.error(error);
        }, function () {
            _this.log('Loaded all child components!');
        });
        return _this;
    }
    FragmentDataComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        if (this.contentResolver) {
            this.contentResolver.componentStates.subscribe(function (_a) {
                var comp = _a[0], state = _a[1];
                var debug_id = ('debug_id' in comp) ? comp['debug_id'] : '';
                _this.log('component state update "%s" on %s', ComponentState[state], comp.constructor.name, debug_id);
            });
        }
        else {
            this.log('has no content resolver');
        }
        this.childElements.subscribe(function (el) {
            _this.log('el', el);
        });
    };
    FragmentDataComponent.prototype.onChildDataComponentLoaded = function (childComponent) {
    };
    return FragmentDataComponent;
}(DataComponent));
export { FragmentDataComponent };
FragmentDataComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                template: ''
            },] },
];
/** @nocollapse */
FragmentDataComponent.ctorParameters = function () { return []; };
FragmentDataComponent.propDecorators = {
    'childComponents': [{ type: ViewChildren, args: [ContentLoaderDirective, {
                    read: ViewContainerRef
                },] },],
};
//# sourceMappingURL=fragment-data.component.js.map