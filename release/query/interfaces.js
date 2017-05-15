"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kio_ng2_1 = require("kio-ng2");
exports.isQueryableAnnotation = function (other) {
    return ('type' in other
        &&
            'modifiers' in other && Array.isArray(other.modifiers));
};
exports.isQueryableFragmentAnnotation = function (other) {
    return (exports.isQueryableAnnotation(other)
        &&
            kio_ng2_1.isCtnFragment(other.type));
};
//# sourceMappingURL=interfaces.js.map