"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kio_ng2_1 = require("kio-ng2");
const _ = require("lodash");
const kio_ng2_2 = require("kio-ng2");
const media_1 = require("../media");
const store_1 = require("../../store");
const parseMockingArgs = (cuid) => {
    const [m, paramSource] = cuid.match(/\[(.*)\]/m);
    if (!paramSource) {
        return null;
    }
    const params = paramSource.split('][').slice(1).filter(v => !!v).map(tupel => tupel.split('='));
    if (params.length === 0)
        return null;
    /*console.log ( 'mocking params' )
    console.table ( params )*/
    const z = _.zip(...params);
    return _.zipObject(z[0], z[1]);
};
class ContentMockingService {
    constructor() { }
    getFixtureForComponent(componentName) {
        const item = store_1.default.getComponentByName(componentName);
        let mockedData = item ? item.fixture : null;
        if (!mockedData)
            return null;
        if (mockedData.type === 'fragment') {
            mockedData = new kio_ng2_1.KioFragmentModel(mockedData);
        }
        else {
            mockedData = new kio_ng2_1.KioContentModel(mockedData.type, mockedData);
        }
        this.fillContent(mockedData);
        return mockedData;
    }
    fillContent(node) {
        if (node.type === 'fragment') {
            (node.children || []).forEach(childNode => {
                this.fillContent(childNode);
            });
        }
        else {
            node.data = this.mockContentData(node);
        }
    }
    mockLoadNodeContent(node, params = {}) {
        node.data = this.mockContentData(node, params);
    }
    mockContentData(node, params = {}) {
        const mockedData = parseMockingArgs(node.cuid) || {};
        params = Object.assign({}, params, mockedData);
        if (node.type === kio_ng2_2.KioNodeType.txt) {
            return Object.assign({ text: 'Lorem ipsum Eiusmod mollit dolor ut irure incididunt exercitation aliqua proident anim minim velit dolor voluptate commodo incididunt eu et proident commodo proident eu nostrud Duis ea nisi non.' }, params);
        }
        return media_1.renderDataForNode(node, params) || params || {};
    }
}
exports.ContentMockingService = ContentMockingService;
//# sourceMappingURL=content-mocking.service.js.map