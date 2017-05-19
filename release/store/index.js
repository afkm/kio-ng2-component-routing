"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./store"));
var store_1 = require("./store");
var component_1 = require("../component");
exports.isNamedComponentStructure = function (other) {
    return ('name' in other
        &&
            component_1.isComponentStructure(other));
};
exports.isNamedFragmentComponentStructure = function (other) {
    return ('name' in other
        &&
            component_1.isComponentFragmentStructure(other));
};
exports.isNamedComponent = function (other) {
    return exports.isNamedComponentStructure(other) || exports.isNamedFragmentComponentStructure(other);
};
exports.registerComponentStructure = function (data) {
    data.forEach(function (comp) {
        store_1.store.addSymbol("criteria", {
            componentName: comp.name,
            prop: 'criteria',
            symbol: comp
        });
    });
};
exports.registerIndex = function (prop, indexSymbolItems) {
    if (process.env.NODE_ENV === 'debug') {
        console.log('registerIndex >%s<', prop);
        var t = indexSymbolItems.length + " symbols";
        console.groupCollapsed(t);
        console.table(indexSymbolItems);
        console.groupEnd();
    }
    indexSymbolItems.forEach(function (item) {
        store_1.store.addSymbol(prop, __assign({}, item, { prop: prop }));
    });
};
exports.registerComponent = function (item) {
    store_1.store.addItem(item);
};
exports.getAllComponents = function () {
    return store_1.store.items.slice();
};
exports.getComponentAt = function (idx) { return store_1.store.getAt(idx); };
exports.getComponentByName = function (componentName) { return store_1.store.find(function (item, idx, list) { return item.componentName === componentName; }); };
exports.getComponentIndexForNode = function (node) { return store_1.store.findItemForNode(node); };
//# sourceMappingURL=index.js.map