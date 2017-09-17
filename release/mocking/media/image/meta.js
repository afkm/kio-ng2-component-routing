export function mockMetaForImage(options) {
    var _a = options || {}, _b = _a.width, width = _b === void 0 ? 640 : _b, _c = _a.height, height = _c === void 0 ? 480 : _c, _d = _a.filename, filename = _d === void 0 ? "mocked-image" : _d, _e = _a.mimeType, mimeType = _e === void 0 ? "image/jpeg" : _e;
    return {
        width: width,
        height: height,
        mimeType: mimeType,
        filename: filename
    };
}
//# sourceMappingURL=meta.js.map