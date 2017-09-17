import { KioContentModel } from 'kio-ng2-data';
import { format as formatArgs } from './args';
import { cuid } from './cuid';
var parseModifiers = function (value) { return (value.match(/\.(\w+)/gm) || []).map(function (v) { return v.substr(1); }); };
var parseTypeName = function (value) { return (value.match(/^\w+/) || [])[0]; };
var parseTypeParams = function (value) { return (value.match(/(\(.+\))/) || [])[0]; };
var parse = function (value) {
    var typeParams = parseTypeParams(value);
    var typeName = parseTypeName(value);
    var modifiers = value.replace(typeParams, '').split('.').slice(1);
    return [typeName, modifiers, typeParams];
};
export var mockContentFromString = function (selector) {
    var _a = selector.match(/^(\w+)(\(.*\))?(\.\w+){0,}/), m = _a[0], typeName = _a[1], typeParams = _a[2], modifiers = _a.slice(3);
    return mockContent(typeName, modifiers);
};
export var mockContentWithArgs = function (nodeType, data) {
    var _a = nodeType.split('.'), type = _a[0], modifiers = _a.slice(1);
    var params = formatArgs(data);
    var mockedData = {
        cuid: cuid(params),
        locale: 'de_DE',
        type: type,
        modifiers: modifiers
    };
    return mockedData;
};
export var mockContent = function (value, modifiers) {
    if (modifiers === void 0) { modifiers = []; }
    var _a = parse(value), typeName = _a[0], _b = _a[1], typeModifiers = _b === void 0 ? [] : _b, _c = _a[2], typeParams = _c === void 0 ? '' : _c;
    var params = typeParams.slice(1, -1)
        .split(';');
    /*.map ( tupelSrc => tupelSrc.split('=') )
    .map ( ([key,value]) => ({key, value}) )*/
    var data = {
        type: typeName,
        modifiers: modifiers.concat(typeModifiers).filter(function (v) { return v; }),
        cuid: cuid.apply(void 0, params),
        locale: 'en_US'
    };
    var node = new KioContentModel(data);
    /*const groupLabel = 'mock content for "'+typeName+'" (' + node.cuid + ')'
    console.groupCollapsed ( groupLabel )
    console.table ( data )
    console.groupEnd ()*/
    return node;
};
/*
export const mockContentWithArgs = ( contentType:'src'|'txt', modifiers:string[], args:MockingParams ):KioContentModel => {
  return new KioContentModel({
    type: contentType,
    cuid: cuid(formatArgs ( args )),
    modifiers
  })
}
*/ 
//# sourceMappingURL=content.js.map