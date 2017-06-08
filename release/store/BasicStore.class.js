"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Query_1 = require("../query/Query");
const _ = require("lodash");
exports.IndexToPropMap = {
    "PublicationComponents": "component",
    "PublicationFixtures": "fixture",
    "PublicationCriterias": "criteria"
};
const emptyItem = {
    componentName: undefined,
    component: undefined,
    fixture: undefined,
    criteria: undefined
};
const normalizeComponentName = (name) => {
    return name.replace(/Component$/, '');
};
/**
 * @brief      component item store
 */
class BasicStore {
    constructor() {
        this.items = [];
    }
    /**
     * register kio component for component routing
     * @param {KioComponentItem} item
     */
    addItem(item) {
        this.items.push(item);
    }
    addSymbol(indexName, indexSymbol) {
        const { componentName, symbol } = indexSymbol;
        const propKey = exports.IndexToPropMap[indexName];
        let componentItem = this.find((item, idx) => normalizeComponentName(item.componentName) === normalizeComponentName(componentName));
        if (!componentItem) {
            componentItem = Object.assign({}, emptyItem, { componentName: normalizeComponentName(componentName) });
            this.addItem(componentItem);
        }
        this.updateItem(componentItem, propKey, symbol);
    }
    updateItem(item, key, value) {
        const items = this.items.slice();
        this.items = items.map((mapItem, idx) => {
            if (item !== mapItem)
                return mapItem;
            return Object.assign({}, item, { [key]: value });
        });
    }
    filter(filter) {
        return _.filter(this.items, filter);
    }
    find(filter) {
        return _.find(this.items, filter);
    }
    getAt(idx) {
        return this.items[idx];
    }
    eachItem(iterator) {
        const clonedList = this.items.slice();
        this.items.forEach((item, idx) => iterator(item, idx, clonedList));
    }
    mapItems(mapper) {
        const clonedList = this.items.slice();
        return this.items.map((item, idx) => mapper(item, idx, clonedList));
    }
    findItemForNode(node) {
        return _.findIndex(this.items, (item, idx) => {
            return item.criteria && Query_1.Query.matchComponent(item.criteria)(node);
        });
    }
}
exports.BasicStore = BasicStore;
//# sourceMappingURL=BasicStore.class.js.map