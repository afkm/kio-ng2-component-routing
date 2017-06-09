"use strict";
/**
 * @module kio-ng2-component-routing
 * @namespace Components
 */
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("../query/interfaces");
exports.isComponentStructure = function (other) {
    return interfaces_1.isQueryableAnnotation(other);
};
exports.isComponentFragmentStructure = function (other) {
    return ('childTypes' in other
        &&
            interfaces_1.isQueryableFragmentAnnotation(other));
};
exports.isNamedAnnotation = function (other) {
    return ('name' in other);
};
exports.isNamedComponentStructure = function (other) {
    return (exports.isNamedAnnotation(other)
        &&
            exports.isComponentStructure(other));
};
exports.isNamedFragmentComponentStructure = function (other) {
    return (exports.isNamedAnnotation(other)
        &&
            exports.isComponentFragmentStructure(other));
};
exports.isNamedComponent = function (other) {
    return exports.isNamedComponentStructure(other) || exports.isNamedFragmentComponentStructure(other);
};
//# sourceMappingURL=interfaces.js.map