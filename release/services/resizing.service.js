import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
var ResizingService = (function () {
    function ResizingService() {
        var _this = this;
        this.resize = Observable.fromEvent(window, 'resize')
            .debounceTime(1000 / 30)
            .map(function (e) { return _this.getSize(); });
    }
    ResizingService.prototype.getSize = function (w) {
        if (w === void 0) { w = window; }
        return {
            width: w.innerWidth,
            height: w.innerHeight
        };
    };
    return ResizingService;
}());
export { ResizingService };
ResizingService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ResizingService.ctorParameters = function () { return []; };
//# sourceMappingURL=resizing.service.js.map