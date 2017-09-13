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
import { ContentDataComponent } from './content-data.component';
var TextDataComponent = (function (_super) {
    __extends(TextDataComponent, _super);
    function TextDataComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextDataComponent.prototype.onUpdate = function () {
        this.text = this.data.text;
        _super.prototype.onUpdate.call(this);
    };
    return TextDataComponent;
}(ContentDataComponent));
export { TextDataComponent };
//# sourceMappingURL=text-data.component.js.map