"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
var assert = require("./assertion");
var Query;
(function (Query) {
    /**
     * @brief      component criteria assertion; returns assertion messages, if any issues occur
     *
     * @param      queryableAnnotation  component query annotation
     * @param      node                 kio node to assert
     *
     * @return     list of assertion messages or null
     */
    function assertComponent(queryableAnnotation) {
        return function (node) {
            var messages = [];
            if (queryableAnnotation.type && assert.eq(queryableAnnotation.type)(node.type) === false) {
                //console.log('invalid node type ' , node.type , ' - component requires: ' , queryableAnnotation.type )
                messages.push('invalid node type "' + node.type + '" for component');
            }
            if (queryableAnnotation.modifiers && assert.query(queryableAnnotation.modifiers)(node.modifiers) === false) {
                //console.log('invalid node modifiers' , node.modifiers , '- component requires: ', queryableAnnotation.modifiers )
                messages.push('invalid node modifiers "' + node.modifiers.join(',') + '" for component');
            }
            var childTypes = (node.children || []).map(function (c) { return c.type; });
            if (interfaces_1.isQueryableFragmentAnnotation(queryableAnnotation)) {
                if (assert.query(queryableAnnotation.childTypes)(childTypes) === false) {
                    //console.log('invalid node childTypes' , childTypes , '- component requires: ', componentAnnotation.childTypes )
                    messages.push('invalid node child types "' + childTypes.join(',') + '" for component. Expected: ' + JSON.stringify(queryableAnnotation.childTypes));
                }
            }
            return messages.length > 0 ? messages : null;
        };
    }
    Query.assertComponent = assertComponent;
    function matchComponent(componentAnnotation) {
        return function (node) {
            if (componentAnnotation.type && assert.eq(componentAnnotation.type)(node.type) === false) {
                //console.log('invalid node type ' , node.type , ' - component requires: ' , componentAnnotation.type )
                return false;
            }
            if (componentAnnotation.modifiers && assert.query(componentAnnotation.modifiers)(node.modifiers) === false) {
                //console.log('invalid node modifiers' , node.modifiers , '- component requires: ', componentAnnotation.modifiers )
                return false;
            }
            var childTypes = (node.children || []).map(function (c) { return c.type; });
            if (componentAnnotation.childTypes && assert.query(componentAnnotation.childTypes)(childTypes) === false) {
                //console.log('invalid node childTypes' , childTypes , '- component requires: ', componentAnnotation.childTypes )
                return false;
            }
            return true;
        };
    }
    Query.matchComponent = matchComponent;
})(Query = exports.Query || (exports.Query = {}));
//# sourceMappingURL=Query.js.map