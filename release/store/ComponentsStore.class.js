"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Query_1 = require("../query/Query");
var _ = require("lodash");
var ComponentsStore = (function () {
    function ComponentsStore() {
        this.items = [];
    }
    /**
     * register kio component for component routing
     * @param {KioComponentItem} item
     */
    ComponentsStore.prototype.addItem = function (item) {
        this.items.push(item);
    };
    ComponentsStore.prototype.filter = function (filter) {
        return _.filter(this.items, filter);
    };
    ComponentsStore.prototype.find = function (filter) {
        return _.find(this.items, filter);
    };
    ComponentsStore.prototype.getAt = function (idx) {
        return this.items[idx];
    };
    ComponentsStore.prototype.eachItem = function (iterator) {
        var clonedList = this.items.slice();
        this.items.forEach(function (item, idx) { return iterator(item, idx, clonedList); });
    };
    ComponentsStore.prototype.mapItems = function (mapper) {
        var clonedList = this.items.slice();
        return this.items.map(function (item, idx) { return mapper(item, idx, clonedList); });
    };
    ComponentsStore.prototype.findItemForNode = function (node) {
        return _.findIndex(this.items, function (item, idx) {
            return Query_1.matchComponent(item.criteria)(node);
        });
    };
    return ComponentsStore;
}());
exports.ComponentsStore = ComponentsStore;
//# sourceMappingURL=ComponentsStore.class.js.map