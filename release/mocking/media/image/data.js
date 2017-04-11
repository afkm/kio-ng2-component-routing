"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var makeRect = function (left, top, right, bottom) {
    return {
        left: left,
        top: top,
        right: right,
        bottom: bottom,
        width: right - left,
        height: bottom - top
    };
};
var padRect = function (rectangle, padding) {
    rectangle = Object.assign({}, rectangle);
    rectangle.top += padding;
    rectangle.left += padding;
    rectangle.right -= padding;
    rectangle.bottom -= padding;
    return rectangle;
};
var drawRect = function (context, rectangle) {
    context.beginPath();
    context.moveTo(rectangle.left, rectangle.top);
    context.lineTo(rectangle.right, rectangle.top);
    context.lineTo(rectangle.right, rectangle.bottom);
    context.lineTo(rectangle.left, rectangle.bottom);
    context.lineTo(rectangle.left, rectangle.top);
    context.closePath();
    context.stroke();
};
var drawCross = function (context, rectangle) {
    context.beginPath();
    context.moveTo(rectangle.left, rectangle.top);
    context.lineTo(rectangle.right, rectangle.bottom);
    context.moveTo(rectangle.right, rectangle.top);
    context.lineTo(rectangle.left, rectangle.bottom);
    context.stroke();
};
var drawText = function (context, options) {
    var _a = options || {}, _b = _a.fontSize, fontSize = _b === void 0 ? 17 : _b, //px!
    _c = _a.fontStyle, //px!
    fontStyle = _c === void 0 ? 'lighter' : _c, _d = _a.fontName, fontName = _d === void 0 ? 'Helvetica' : _d, _e = _a.left, left = _e === void 0 ? 0 : _e, _f = _a.top, top = _f === void 0 ? 0 : _f;
    context.font = fontSize + "px " + fontName;
    var offsetY = top + fontSize;
    var drawLine = function (text) {
        if (Array.isArray(text))
            return text.map(function (line) { return drawLine(line); });
        context.fillText(text, left + 1, offsetY);
        offsetY += fontSize;
    };
    return drawLine;
};
function renderDataURL(options) {
    var _a = options || {}, _b = _a.width, width = _b === void 0 ? 640 : _b, _c = _a.height, height = _c === void 0 ? 480 : _c, _d = _a.filename, filename = _d === void 0 ? "mocked-image" : _d, _e = _a.mimeType, mimeType = _e === void 0 ? "image/jpeg" : _e, _f = _a.background, background = _f === void 0 ? "darkgray" : _f, _g = _a.foreground, foreground = _g === void 0 ? "#ffffff" : _g;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    //canvas.classList.add('dbg-canvas')
    //document.body.appendChild(canvas)
    var context = canvas.getContext('2d');
    var rect = makeRect(0, 0, width, height);
    var padding = 10;
    context.fillStyle = background;
    context.fillRect(rect.left, rect.top, rect.right, rect.bottom);
    context.strokeStyle = foreground;
    drawRect(context, padRect(rect, padding));
    drawCross(context, padRect(rect, padding * 2));
    context.fillStyle = foreground;
    var drawLine = drawText(context, { left: padding, top: padding });
    drawLine('filename: ' + filename);
    drawLine('mimeType: ' + mimeType);
    drawLine('width: ' + width);
    drawLine('height: ' + height);
    var dataURL = canvas.toDataURL();
    return dataURL;
}
exports.renderDataURL = renderDataURL;
//# sourceMappingURL=data.js.map