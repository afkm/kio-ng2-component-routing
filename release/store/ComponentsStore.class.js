"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicStore_class_1 = require("./BasicStore.class");
class ComponentsStore extends BasicStore_class_1.BasicStore {
    registerIndex(indexName, indexSymbols) {
        console.log('registerIndex >%s<', indexName);
        const t = `${indexSymbols.length} symbols`;
        console.groupCollapsed(t);
        console.table(indexSymbols);
        console.groupEnd();
        indexSymbols.forEach(item => {
            this.addSymbol(indexName, item);
        });
    }
    registerComponent(item) {
        this.addItem(item);
    }
    getAllComponents() {
        return this.items.slice();
    }
    getComponentAt(idx) {
        return this.getAt(idx);
    }
    getComponentByName(componentName) {
        return this.find((item, idx, list) => item.componentName === componentName);
    }
    getComponentIndexForNode(node) {
        return this.findItemForNode(node);
    }
}
exports.ComponentsStore = ComponentsStore;
//# sourceMappingURL=ComponentsStore.class.js.map