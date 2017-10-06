var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { KioContentModel, KioFragmentModel } from 'kio-ng2-data';
var _zip = require('lodash.zip');
var _zipObject = require('lodash.zipobject');
import { renderDataForNode } from '../media';
import { defaultStore } from '../../classes/component-store';
var parseMockingArgs = function (cuid) {
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
var ContentMockingService = (function () {
    function ContentMockingService() {
    }
    ContentMockingService.prototype.getFixtureForComponent = function (componentName) {
        var item = defaultStore.getComponentByName(componentName);
        var mockedData = item ? item.fixture : null;
        if (!mockedData)
            return null;
        if (mockedData.type === 'fragment') {
            mockedData = new KioFragmentModel(mockedData);
        }
        else {
            mockedData = new KioContentModel(mockedData);
        }
        this.fillContent(mockedData);
        return mockedData;
    };
    ContentMockingService.prototype.fillContent = function (node) {
        var _this = this;
        if (node.type === 'fragment') {
            (node.children || []).forEach(function (childNode) {
                _this.fillContent(childNode);
            });
        }
        else {
            node.data = this.mockContentData(node);
        }
    };
    ContentMockingService.prototype.mockLoadNodeContent = function (node, params) {
        if (params === void 0) { params = {}; }
        node.data = this.mockContentData(node, params);
    };
    ContentMockingService.prototype.mockContentData = function (node, params) {
        if (params === void 0) { params = {}; }
        var mockedData = parseMockingArgs(node.cuid) || {};
        params = __assign({}, params, mockedData);
        if (node.type === 'txt') {
            return __assign({ text: 'Lorem ipsum Eiusmod mollit dolor ut irure incididunt exercitation aliqua proident anim minim velit dolor voluptate commodo incididunt eu et proident commodo proident eu nostrud Duis ea nisi non.' }, params);
        }
        return renderDataForNode(node, params) || params || {};
    };
    return ContentMockingService;
}());
export { ContentMockingService };
//# sourceMappingURL=content-mocking.service.js.map