"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var kio_ng2_1 = require("kio-ng2");
var component_class_1 = require("../component.class");
var KioFragmentComponentStructure = (function (_super) {
    __extends(KioFragmentComponentStructure, _super);
    function KioFragmentComponentStructure(modifiers, childTypes) {
        var _this = _super.call(this, kio_ng2_1.KioNodeType.fragment, modifiers) || this;
        _this.modifiers = modifiers;
        _this.childTypes = childTypes;
        return _this;
    }
    return KioFragmentComponentStructure;
}(component_class_1.KioComponentStructure));
exports.KioFragmentComponentStructure = KioFragmentComponentStructure;
//# sourceMappingURL=component.class.js.map