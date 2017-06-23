"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentsStore_class_1 = require("./ComponentsStore.class");
var store = new ComponentsStore_class_1.ComponentsStore();
exports.registerIndex = function (indexName, indexSymbols) {
    /*console.log('registerIndex >%s<', indexName)
    const t = `${indexSymbols.length} symbols`
    console.groupCollapsed(t)
    console.table(indexSymbols)
    console.groupEnd()*/
    indexSymbols.forEach(function (item) {
        store.addSymbol(indexName, item);
    });
};
exports.registerComponent = function (item) {
    store.addItem(item);
};
exports.getAllComponents = function () { return store.items.slice(); };
exports.getComponentAt = function (idx) { return store.getAt(idx); };
exports.getComponentByName = function (componentName) { return store.find(function (item, idx, list) { return item.componentName === componentName; }); };
exports.getComponentIndexForNode = function (node) { return store.findItemForNode(node); };
//# sourceMappingURL=index.js.map