var _cuid = require('cuid');
export var cuid = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    var prefixes = ['mock'].concat(params);
    return '[' + prefixes.join('][') + ']' + _cuid();
};
//# sourceMappingURL=cuid.js.map