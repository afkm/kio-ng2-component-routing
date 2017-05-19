"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kio_ng2_1 = require("kio-ng2");
var _cuid = require('cuid');
var parseModifiers = function (value) { return (value.match(/\.(\w+)/gm) || []).map(function (v) { return v.substr(1); }); };
var parseTypeName = function (value) { return (value.match(/^\w+/) || [])[0]; };
var parseTypeParams = function (value) { return (value.match(/(\(.+\))/) || [])[0]; };
function isMockSchema(other) {
    return (!!other.type
        &&
            ('cuid' in other
                ||
                    'modifiers' in other
                ||
                    'typeParams' in other));
}
exports.isMockSchema = isMockSchema;
var parse = function (value) {
    var typeParams = parseTypeParams(value);
    var typeName = parseTypeName(value);
    var modifiers = value.replace(typeParams, '').split('.').slice(1);
    return {
        type: kio_ng2_1.nodeType(typeName),
        modifiers: modifiers,
        typeParams: typeParams
    };
};
exports.cuid = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    var prefixes = ['mock'].concat(params);
    return '[' + prefixes.join('][') + ']' + _cuid();
};
exports.mockFragment = function (children, modifiers) {
    if (modifiers === void 0) { modifiers = []; }
    return new kio_ng2_1.KioFragmentModel({
        cuid: exports.cuid(),
        modifiers: modifiers,
        type: 'fragment',
        children: children.map(function (child) {
            if (child instanceof kio_ng2_1.KioNodeModel) {
                return child;
            }
            if (isMockSchema(child)) {
                if (child.type !== kio_ng2_1.KioNodeType.fragment) {
                    return new kio_ng2_1.KioContentModel(child.type, child);
                }
                if (child.type === kio_ng2_1.KioNodeType.fragment) {
                    return new kio_ng2_1.KioFragmentModel(child);
                }
            }
            if (Array.isArray(child)) {
                return exports.mockFragment(child[0], child[1]);
            }
            if ('string' === typeof child) {
                return exports.mockContentFromString(child);
            }
        })
    });
};
exports.mockContentFromString = function (selector) {
    var _a = selector.match(/^(\w+)(\(.*\))?(\.\w+){0,}/), m = _a[0], typeName = _a[1], typeParams = _a[2], modifiers = _a.slice(3);
    return mockContent(typeName, modifiers);
};
exports.mockPrimitive = function (type, modifiers, cuid, parent) {
    var data = {
        type: type,
        modifiers: modifiers,
        cuid: cuid,
        locale: 'en_US'
    };
    return new kio_ng2_1.KioContentModel(type, data, parent);
};
function mockContent(value, modifiers, parent) {
    if (modifiers === void 0) { modifiers = []; }
    if ('string' === typeof value) {
        var _a = parse(value), type = _a.type, _b = _a.modifiers, modifiers_1 = _b === void 0 ? [] : _b, _c = _a.typeParams, typeParams = _c === void 0 ? '' : _c;
        var params = typeParams.slice(1, -1)
            .split(';');
        if (kio_ng2_1.isPrimitiveContentType(type)) {
            return exports.mockPrimitive(type, modifiers_1, exports.cuid.apply(void 0, params), parent);
        }
    }
    else {
        return exports.mockPrimitive(value, modifiers, exports.cuid(), parent);
    }
    /*.map ( tupelSrc => tupelSrc.split('=') )
    .map ( ([key,value]) => ({key, value}) )*/
}
exports.mockContent = mockContent;
//# sourceMappingURL=content.js.map