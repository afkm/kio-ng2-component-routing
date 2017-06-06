/**
 * @module kio-ng2-component-routing
 * @namespace Components
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = require("../query");
exports.isComponentStructure = function (other) {
    return query_1.isQueryableAnnotation(other);
};
exports.isComponentFragmentStructure = function (other) {
    return ('childTypes' in other
        &&
            query_1.isQueryableFragmentAnnotation(other));
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