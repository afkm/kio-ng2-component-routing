"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./store"));
var store_1 = require("./store");
exports.registerComponentStructure = function (data) {
    data.forEach(function (comp) {
        store_1.store.addSymbol("criteria", {
            componentName: comp.name,
            prop: 'criteria',
            symbol: comp
        });
    });
};
exports.registerIndex = function (indexName, indexSymbols) {
    if (process.env.NODE_ENV === 'debug') {
        console.log('registerIndex >%s<', indexName);
        var t = indexSymbols.length + " symbols";
        console.groupCollapsed(t);
        console.table(indexSymbols);
        console.groupEnd();
    }
    indexSymbols.forEach(function (item) {
        store_1.store.addSymbol(indexName, item);
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