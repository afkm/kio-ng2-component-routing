"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var BasicStore_class_1 = require("./BasicStore.class");
var ComponentsStore = (function (_super) {
    __extends(ComponentsStore, _super);
    function ComponentsStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentsStore.prototype.registerIndex = function (indexName, indexSymbols) {
        var _this = this;
        console.log('registerIndex >%s<', indexName);
        var t = indexSymbols.length + " symbols";
        console.groupCollapsed(t);
        console.table(indexSymbols);
        console.groupEnd();
        indexSymbols.forEach(function (item) {
            _this.addSymbol(indexName, item);
        });
    };
    ComponentsStore.prototype.registerComponent = function (item) {
        this.addItem(item);
    };
    ComponentsStore.prototype.getAllComponents = function () {
        return this.items.slice();
    };
    ComponentsStore.prototype.getComponentAt = function (idx) {
        return this.getAt(idx);
    };
    ComponentsStore.prototype.getComponentByName = function (componentName) {
        return this.find(function (item, idx, list) { return item.componentName === componentName; });
    };
    ComponentsStore.prototype.getComponentIndexForNode = function (node) {
        return this.findItemForNode(node);
    };
    return ComponentsStore;
}(BasicStore_class_1.BasicStore));
exports.ComponentsStore = ComponentsStore;
//# sourceMappingURL=ComponentsStore.class.js.map