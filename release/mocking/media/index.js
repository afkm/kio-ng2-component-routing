"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var imageType = require("./image");
var mediaTypes = [
    { name: 'image', type: imageType }
];
function renderDataForNode(node, params) {
    var mediaType = mediaTypes.find(function (mediaType) { return mediaType.type.matchNode(node); });
    if (mediaType) {
        var meta = mediaType.type.mockMeta(Object.assign({}, params, { filename: node.cuid }));
        return {
            meta: meta,
            url: mediaType.type.renderDataURL(meta)
        };
    }
    return null;
}
exports.renderDataForNode = renderDataForNode;
//# sourceMappingURL=index.js.map