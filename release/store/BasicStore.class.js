"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Query_1 = require("../query/Query");
var _ = require("lodash");
exports.IndexToPropMap = {
    "PublicationComponents": "component",
    "PublicationFixtures": "fixture",
    "PublicationCriterias": "criteria"
};
var emptyItem = {
    componentName: undefined,
    component: undefined,
    fixture: undefined,
    criteria: undefined
};
var normalizeComponentName = function (name) {
    return name.replace(/Component$/, '');
};
/**
 * @brief      component item store
 */
var BasicStore = (function () {
    function BasicStore() {
        this.items = [];
    }
    /**
     * register kio component for component routing
     * @param {KioComponentItem} item
     */
    BasicStore.prototype.addItem = function (item) {
        this.items.push(item);
    };
    BasicStore.prototype.addSymbol = function (indexName, indexSymbol) {
        var componentName = indexSymbol.componentName, symbol = indexSymbol.symbol;
        var propKey = exports.IndexToPropMap[indexName];
        var componentItem = this.find(function (item, idx) { return normalizeComponentName(item.componentName) === normalizeComponentName(componentName); });
        if (!componentItem) {
            componentItem = __assign({}, emptyItem, { componentName: normalizeComponentName(componentName) });
            this.addItem(componentItem);
        }
        this.updateItem(componentItem, propKey, symbol);
    };
    BasicStore.prototype.updateItem = function (item, key, value) {
        var items = this.items.slice();
        this.items = items.map(function (mapItem, idx) {
            if (item !== mapItem)
                return mapItem;
            return __assign({}, item, (_a = {}, _a[key] = value, _a));
            var _a;
        });
    };
    BasicStore.prototype.filter = function (filter) {
        return _.filter(this.items, filter);
    };
    BasicStore.prototype.find = function (filter) {
        return _.find(this.items, filter);
    };
    BasicStore.prototype.getAt = function (idx) {
        return this.items[idx];
    };
    BasicStore.prototype.eachItem = function (iterator) {
        var clonedList = this.items.slice();
        this.items.forEach(function (item, idx) { return iterator(item, idx, clonedList); });
    };
    BasicStore.prototype.mapItems = function (mapper) {
        var clonedList = this.items.slice();
        return this.items.map(function (item, idx) { return mapper(item, idx, clonedList); });
    };
    BasicStore.prototype.findItemForNode = function (node) {
        return _.findIndex(this.items, function (item, idx) {
            return item.criteria && Query_1.Query.matchComponent(item.criteria)(node);
        });
    };
    return BasicStore;
}());
exports.BasicStore = BasicStore;
//# sourceMappingURL=BasicStore.class.js.map