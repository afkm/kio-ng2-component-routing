"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_class_1 = require("./classes/fragment/component.class");
var component_class_2 = require("./classes/node/component.class");
var interfaces_1 = require("../query/interfaces");
var kio_ng2_1 = require("kio-ng2");
exports.isListQuery = function (other) {
    return (('length' in other && ('number' === typeof other.length || 'function' === typeof other.length))
        ||
            ('contains' in other)
        ||
            ('containsNot' in other)
        ||
            ('all' in other)
        ||
            ('deepEqual' in other));
};
var createListQuery = function (value) {
    if (Array.isArray(value)) {
        return { deepEqual: value };
    }
    if (exports.isListQuery(value)) {
        return value;
    }
    return {
        deepEqual: [value]
    };
};
exports.parseListQuery = function (query, sep) {
    if (sep === void 0) { sep = '.'; }
    if (exports.isListQuery(query)) {
        return query;
    }
    else if (Array.isArray(query)) {
        return createListQuery(query);
    }
    else {
        return exports.parseListQuery([query]);
    }
};
exports.fromString = function (source) {
    var _a = source.split(' '), fragmentSource = _a[0], children = _a.slice(1);
    var _b = fragmentSource.match(/(txt|src|fragment)(\.(\w+)){0,}/), _ = _b[0], _c = _b[1], ptype = _c === void 0 ? undefined : _c, pmodifiers = _b.slice(2);
    var modifiers = exports.parseListQuery(pmodifiers);
    if (kio_ng2_1.isChildContentType(ptype)) {
        if (kio_ng2_1.isCtnFragment(ptype)) {
            return new component_class_1.KioFragmentComponentStructure(modifiers, children.map(exports.fromString));
        }
        else if (kio_ng2_1.isCtnSrc(ptype)) {
            return new component_class_2.KioContentComponentStructure(kio_ng2_1.KioNodeType.src, modifiers);
        }
        else if (kio_ng2_1.isCtnTxt(ptype)) {
            return new component_class_2.KioContentComponentStructure(kio_ng2_1.KioNodeType.txt, modifiers);
        }
    }
};
exports.fromObject = function (annotation) {
    if (interfaces_1.isQueryableFragmentAnnotation(annotation)) {
        return new component_class_1.KioFragmentComponentStructure(annotation.modifiers, annotation.childTypes);
    }
};
//# sourceMappingURL=from.js.map