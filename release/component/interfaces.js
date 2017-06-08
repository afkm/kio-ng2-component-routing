"use strict";
/**
 * @module kio-ng2-component-routing
 * @namespace Components
 */
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../query");
exports.isComponentStructure = (other) => {
    return query_1.isQueryableAnnotation(other);
};
exports.isComponentFragmentStructure = (other) => {
    return ('childTypes' in other
        &&
            query_1.isQueryableFragmentAnnotation(other));
};
exports.isNamedAnnotation = (other) => {
    return ('name' in other);
};
exports.isNamedComponentStructure = (other) => {
    return (exports.isNamedAnnotation(other)
        &&
            exports.isComponentStructure(other));
};
exports.isNamedFragmentComponentStructure = (other) => {
    return (exports.isNamedAnnotation(other)
        &&
            exports.isComponentFragmentStructure(other));
};
exports.isNamedComponent = (other) => {
    return exports.isNamedComponentStructure(other) || exports.isNamedFragmentComponentStructure(other);
};
//# sourceMappingURL=interfaces.js.map