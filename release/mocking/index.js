"use strict";
/**
 * @internal
 * @module ContentMocking
 * @preferred
 * content mocking module
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./service/content-mocking.service"));
__export(require("./content"));
var content_1 = require("./content");
var ContentMocking;
(function (ContentMocking) {
    /**
     * arg = ['txt.heading','src.image']
     * arg = ['txt.heading',['src.big-image','txt.paragraph']]
     */
    ContentMocking.mockNodeOfType = function (nodeType, children) {
        if (children === void 0) { children = []; }
        var _a = nodeType.split('.'), type = _a[0], modifiers = _a.slice(1);
        var mockedNode = {
            cuid: content_1.cuid(),
            locale: 'en_US',
            type: type,
            modifiers: modifiers
        };
        if (children.length > 0) {
            mockedNode.children = children.map(function (child) { return ContentMocking.mockType(child); });
        }
        else if (type === 'txt') {
            mockedNode.cuid = '[mock]' + mockedNode.cuid;
        }
        return mockedNode;
    };
    ContentMocking.mockType = function (value, children) {
        var node;
        if ('string' === typeof value) {
            node = ContentMocking.mockNodeOfType(value, children);
        }
        else if (Array.isArray(value)) {
            node = ContentMocking.mockNodeOfType('fragment', value);
        }
        /*console.group('mocked node')
        console.log ( '%c%s' , 'font-weight: bold; color: green; font-size: 14px' , value )
        console.log ( 'children' , children )
        console.log ( 'result' , node )
        console.groupEnd()*/
        return node;
    };
    //console.log ( mockType ('fragment.img.gallery',['txt','src']) )
})(ContentMocking = exports.ContentMocking || (exports.ContentMocking = {}));
//# sourceMappingURL=index.js.map