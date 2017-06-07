"use strict";
/**
 * @module ContentMocking
 */
Object.defineProperty(exports, "__esModule", { value: true });
const kio_ng2_1 = require("kio-ng2");
const _cuid = require('cuid');
const parseModifiers = (value) => (value.match(/\.(\w+)/gm) || []).map(v => v.substr(1));
const parseTypeName = (value) => (value.match(/^\w+/) || [])[0];
const parseTypeParams = (value) => (value.match(/(\(.+\))/) || [])[0];
const parse = (value) => {
    const typeParams = parseTypeParams(value);
    const typeName = parseTypeName(value);
    const modifiers = value.replace(typeParams, '').split('.').slice(1);
    return [typeName, modifiers, typeParams];
};
exports.cuid = (...params) => {
    const prefixes = ['mock', ...params];
    return '[' + prefixes.join('][') + ']' + _cuid();
};
exports.mockFragment = (children, modifiers = []) => {
    return new kio_ng2_1.KioFragmentModel({
        cuid: exports.cuid(),
        type: kio_ng2_1.KioNodeType.fragment,
        modifiers,
        children: children.map(child => {
            if (child.isKioNode)
                return child;
            if (Array.isArray(child)) {
                return exports.mockFragment(child[0], child[1]);
            }
            return exports.mockContentFromString(child);
        })
    });
};
exports.mockContentFromString = (selector) => {
    const [m, typeName, typeParams, ...modifiers] = selector.match(/^(\w+)(\(.*\))?(\.\w+){0,}/);
    return exports.mockContent(typeName, modifiers);
};
exports.mockContent = (value, modifiers = []) => {
    const [typeName, typeModifiers = [], typeParams = ''] = parse(value);
    const params = typeParams.slice(1, -1)
        .split(';');
    /*.map ( tupelSrc => tupelSrc.split('=') )
    .map ( ([key,value]) => ({key, value}) )*/
    const data = {
        type: typeName,
        modifiers: modifiers.concat(typeModifiers).filter(v => v),
        cuid: exports.cuid(...params),
        locale: 'en_US'
    };
    const node = new kio_ng2_1.KioContentModel(typeName, data);
    /*const groupLabel = 'mock content for "'+typeName+'" (' + node.cuid + ')'
    console.groupCollapsed ( groupLabel )
    console.table ( data )
    console.groupEnd ()*/
    return node;
};
//# sourceMappingURL=content.js.map