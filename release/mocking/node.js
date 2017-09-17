import { cuid } from './cuid';
/**
 * arg = ['txt.heading','src.image']
 * arg = ['txt.heading',['src.big-image','txt.paragraph']]
 */
export var mockNodeOfType = function (nodeType, children) {
    if (children === void 0) { children = []; }
    var _a = nodeType.split('.'), type = _a[0], modifiers = _a.slice(1);
    var mockedNode = {
        cuid: cuid(),
        locale: 'en_US',
        type: type,
        modifiers: modifiers
    };
    if (children.length > 0) {
        mockedNode.children = children.map(function (child) { return mockType(child); });
    }
    else if (type === 'txt') {
        mockedNode.cuid = '[mock]' + mockedNode.cuid;
    }
    return mockedNode;
};
export var mockType = function (value, children) {
    var node;
    if ('string' === typeof value) {
        node = mockNodeOfType(value, children);
    }
    else if (Array.isArray(value)) {
        node = mockNodeOfType('fragment', value);
    }
    /*console.group('mocked node')
    console.log ( '%c%s' , 'font-weight: bold; color: green; font-size: 14px' , value )
    console.log ( 'children' , children )
    console.log ( 'result' , node )
    console.groupEnd()*/
    return node;
};
//# sourceMappingURL=node.js.map