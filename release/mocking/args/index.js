"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
exports.encodeValue = function (value) { return JSON.stringify(value); };
exports.decodeValue = function (value) { return JSON.parse(value); };
exports.format = function (params) {
    return Object.keys(params).map(function (key) { return key + "=" + exports.encodeValue(params[key]); }).join(';');
};
exports.parse = function (cuid) {
    var _a = cuid.match(/\[(.*)\]/m), m = _a[0], paramSource = _a[1];
    if (!paramSource) {
        return null;
    }
    var params = paramSource.split('][').slice(1).filter(function (v) { return !!v; }).map(function (tupel) { return tupel.split('='); });
    if (params.length === 0)
        return null;
    /*console.log ( 'mocking params' )
    console.table ( params )*/
    var z = _.zip.apply(_, params);
    return _.zipObject(z[0], z[1]);
};
//# sourceMappingURL=index.js.map