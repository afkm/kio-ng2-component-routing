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
import { Component, ComponentFactoryResolver } from '@angular/core';
import { KioPublicationModel } from 'kio-ng2-data';
import { DataComponent } from '../base';
var ListComponentRouter = (function (_super) {
    __extends(ListComponentRouter, _super);
    function ListComponentRouter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.componentFactoryResolver = _this.injector.get(ComponentFactoryResolver);
        _this.childNodes = [];
        return _this;
    }
    ListComponentRouter.prototype.onNodeUpdate = function () {
        this.applyChildNodes();
        _super.prototype.onNodeUpdate.call(this);
    };
    ListComponentRouter.prototype.applyChildNodes = function () {
        if (this.node instanceof KioPublicationModel) {
            this.childNodes = this.node.content;
        }
        else {
            this.childNodes = this.node.children;
        }
    };
    return ListComponentRouter;
}(DataComponent));
export { ListComponentRouter };
ListComponentRouter.decorators = [
    { type: Component, args: [{
                selector: 'list-component-router',
                templateUrl: './list-router.component.html'
            },] },
];
/** @nocollapse */
ListComponentRouter.ctorParameters = function () { return []; };
//# sourceMappingURL=list-router.component.js.map