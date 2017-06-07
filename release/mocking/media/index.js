"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imageType = require("./image");
const mediaTypes = [
    { name: 'image', type: imageType }
];
function renderDataForNode(node, params) {
    const mediaType = mediaTypes.find(mediaType => mediaType.type.matchNode(node));
    if (mediaType) {
        const meta = mediaType.type.mockMeta(Object.assign({}, params, { filename: node.cuid }));
        return {
            meta: meta,
            url: mediaType.type.renderDataURL(meta)
        };
    }
    return null;
}
exports.renderDataForNode = renderDataForNode;
//# sourceMappingURL=index.js.map