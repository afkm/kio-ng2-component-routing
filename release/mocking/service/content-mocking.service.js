"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var kio_ng2_1 = require("kio-ng2");
var _ = require("lodash");
var media_1 = require("../media");
var store = require("../../store");
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
    var z = _.zip.apply(_, params);
    return _.zipObject(z[0], z[1]);
};
var ContentMockingService = (function () {
    function ContentMockingService() {
    }
    ContentMockingService.prototype.getFixtureForComponent = function (componentName) {
        var item = store.getComponentByName(componentName);
        var mockedData = item ? item.fixture : null;
        if (!mockedData)
            return null;
        if (mockedData.type === 'fragment') {
            mockedData = new kio_ng2_1.KioFragmentModel(mockedData);
        }
        else {
            mockedData = new kio_ng2_1.KioContentModel(mockedData);
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
        return media_1.renderDataForNode(node, params) || params || {};
    };
    return ContentMockingService;
}());
exports.ContentMockingService = ContentMockingService;
//# sourceMappingURL=content-mocking.service.js.map