var _zip = require('lodash.zip');
var _zipObject = require('lodash.zipobject');
export var encodeValue = function (value) { return JSON.stringify(value); };
export var decodeValue = function (value) { return JSON.parse(value); };
export var format = function (params) {
    return Object.keys(params).map(function (key) { return key + "=" + encodeValue(params[key]); }).join(';');
};
export var parse = function (cuid) {
    var _a = cuid.match(/\[(.*)\]/m), m = _a[0], paramSource = _a[1];
    if (!paramSource) {
        return null;
    }
    var params = paramSource.split('][').slice(1).filter(function (v) { return !!v; }).map(function (tupel) { return tupel.split('='); });
    if (params.length === 0)
        return null;
    /*console.log ( 'mocking params' )
    console.table ( params )*/
    var z = _zip.apply(void 0, params);
    return _zipObject(z[0], z[1]);
};
//# sourceMappingURL=index.js.map