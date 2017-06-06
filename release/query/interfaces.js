"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isQueryableAnnotation = function (other) {
    return ('type' in other
        &&
            'string' === typeof other.type);
};
exports.isQueryableFragmentAnnotation = function (other) {
    return ('childTypes' in other
        &&
            exports.isQueryableAnnotation(other));
};
//# sourceMappingURL=interfaces.js.map