"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isQueryableAnnotation = (other) => {
    return ('type' in other
        &&
            'string' === typeof other.type);
};
exports.isQueryableFragmentAnnotation = (other) => {
    return ('childTypes' in other
        &&
            exports.isQueryableAnnotation(other));
};
//# sourceMappingURL=interfaces.js.map