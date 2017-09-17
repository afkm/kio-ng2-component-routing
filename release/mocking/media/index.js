import * as imageType from './image';
var mediaTypes = [
    { name: 'image', type: imageType }
];
export function renderDataForNode(node, params) {
    var mediaType = mediaTypes.find(function (mediaType) { return mediaType.type.matchNode(node); });
    if (mediaType) {
        var meta = mediaType.type.mockMeta(Object.assign({}, params, { filename: node.cuid }));
        return {
            meta: meta,
            url: mediaType.type.renderDataURL(meta)
        };
    }
    return undefined;
}
//# sourceMappingURL=index.js.map