"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_1 = require("./meta");
exports.mockMeta = meta_1.mockMetaForImage;
const data_1 = require("./data");
exports.renderDataURL = data_1.renderDataURL;
exports.matchNode = (node) => {
    return node.type === 'src' && (node.modifiers.indexOf('image') > -1 || node.modifiers.indexOf('img') > -1);
};
//# sourceMappingURL=index.js.map