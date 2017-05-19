"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("../../query/interfaces");
exports.isComponentStructure = function (other) {
    return interfaces_1.isQueryableAnnotation(other);
};
exports.isComponentFragmentStructure = function (other) {
    return ('childTypes' in other
        &&
            interfaces_1.isQueryableFragmentAnnotation(other));
};
//# sourceMappingURL=component.js.map