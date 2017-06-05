"use strict";
/**
 * @module ContentMocking
 */
Object.defineProperty(exports, "__esModule", { value: true });
var kio_ng2_1 = require("kio-ng2");
var _cuid = require('cuid');
var parseModifiers = function (value) { return (value.match(/\.(\w+)/gm) || []).map(function (v) { return v.substr(1); }); };
var parseTypeName = function (value) { return (value.match(/^\w+/) || [])[0]; };
var parseTypeParams = function (value) { return (value.match(/(\(.+\))/) || [])[0]; };
var parse = function (value) {
    var typeParams = parseTypeParams(value);
    var typeName = parseTypeName(value);
    var modifiers = value.replace(typeParams, '').split('.').slice(1);
    return [typeName, modifiers, typeParams];
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
        children: children.map(function (child) {
            if (child.isKioNode)
                return child;
            if (Array.isArray(child)) {
                return exports.mockFragment(child[0], child[1]);
            }
            return exports.mockContentFromString(child);
        })
    });
};
exports.mockContentFromString = function (selector) {
    var _a = selector.match(/^(\w+)(\(.*\))?(\.\w+){0,}/), m = _a[0], typeName = _a[1], typeParams = _a[2], modifiers = _a.slice(3);
    return exports.mockContent(typeName, modifiers);
};
exports.mockContent = function (value, modifiers) {
    if (modifiers === void 0) { modifiers = []; }
    var _a = parse(value), typeName = _a[0], _b = _a[1], typeModifiers = _b === void 0 ? [] : _b, _c = _a[2], typeParams = _c === void 0 ? '' : _c;
    var params = typeParams.slice(1, -1)
        .split(';');
    /*.map ( tupelSrc => tupelSrc.split('=') )
    .map ( ([key,value]) => ({key, value}) )*/
    var data = {
        type: typeName,
        modifiers: modifiers.concat(typeModifiers).filter(function (v) { return v; }),
        cuid: exports.cuid.apply(void 0, params),
        locale: 'en_US'
    };
    var node = new kio_ng2_1.KioContentModel(data);
    /*const groupLabel = 'mock content for "'+typeName+'" (' + node.cuid + ')'
    console.groupCollapsed ( groupLabel )
    console.table ( data )
    console.groupEnd ()*/
    return node;
};
//# sourceMappingURL=content.js.map