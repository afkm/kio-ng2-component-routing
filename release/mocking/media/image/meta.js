"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mockMetaForImage(options) {
    const { width = 640, height = 480, filename = "mocked-image", mimeType = "image/jpeg" } = options || {};
    return {
        width,
        height,
        mimeType,
        filename
    };
}
exports.mockMetaForImage = mockMetaForImage;
//# sourceMappingURL=meta.js.map