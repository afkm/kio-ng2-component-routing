//import * as dasherize from 'dasherize'
import { matchComponent } from '../matching/Query';
var dasherize = require('dasherize');
var getListQueryValue = function (listQuery, m) {
    if (m === void 0) { m = 1; }
    if ('string' === typeof listQuery) {
        return m;
    }
    if (!Array.isArray(listQuery)) {
        var propValues = Object.keys(listQuery).map(function (key) {
            switch (key) {
                case "deepEqual":
                    return getListQueryValue(listQuery[key], 10);
                default:
                    return getListQueryValue(listQuery[key]);
            }
        });
        return propValues.reduce(function (c, p, i) { return c + p; });
    }
    return listQuery.length;
};
var ComponentStore = (function () {
    function ComponentStore() {
        this.components = [];
    }
    ComponentStore.AnnotationValue = function (annotation) {
        return getListQueryValue(annotation);
    };
    Object.defineProperty(ComponentStore.prototype, "size", {
        get: function () {
            return this.components.length;
        },
        enumerable: true,
        configurable: true
    });
    ComponentStore.prototype.indexOf = function (item) {
        return this.components.findIndex(function ($item) { return $item.name === item.name; });
    };
    ComponentStore.prototype.registerComponent = function (componentName, annotation, component, fixture) {
        //console.log('ComponentStore::registerComponent -> %s', componentName, { annotation, component })
        if (this.getComponentByName(componentName)) {
            return;
        }
        var item = {
            name: componentName,
            annotation: annotation,
            component: component,
            fixture: fixture
        };
        //console.log('ComponentStore::registerComponent | storeItem', item )
        var idx = this.components.push(item);
        // window.afkm.logger.log('component store item added at %s: ', idx, item )
    };
    ComponentStore.FormatStoreItemName = function (name) {
        return dasherize(name.replace(/^(kio|publication)\-/, ''));
    };
    ComponentStore.prototype.map = function (fn) {
        return this.components.map(fn);
    };
    ComponentStore.prototype.getComponentByName = function (componentName) {
        componentName = (componentName || '').replace(/component/i, '');
        componentName = dasherize(componentName);
        return this.components.find(function (storeItem) { return ComponentStore.FormatStoreItemName(storeItem.name) === componentName; });
    };
    ComponentStore.prototype.getComponentAt = function (index) {
        return this.components[index];
    };
    ComponentStore.prototype.getComponentForNode = function (node) {
        var matchingComponents = [];
        this.components.forEach(function (storeItem, idx) {
            if (matchComponent(storeItem.annotation)(node)) {
                matchingComponents.push(storeItem);
            }
        });
        var r = matchingComponents.sort(function (a, b) {
            var aValue = ComponentStore.AnnotationValue(a.annotation);
            var bValue = ComponentStore.AnnotationValue(b.annotation);
            return aValue - bValue;
        });
        return r.shift();
    };
    return ComponentStore;
}());
export { ComponentStore };
export var defaultStore = new ComponentStore();
//# sourceMappingURL=component-store.js.map