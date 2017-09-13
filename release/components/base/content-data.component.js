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
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
//import 'rxjs/add/operator/mergeMap'
import { Input, EventEmitter, Output } from '@angular/core';
import { KioContentState } from 'kio-ng2-data';
import { BackendService } from 'kio-ng2-ctn';
import { DataComponent } from './data.component';
var ContentDataComponent = (function (_super) {
    __extends(ContentDataComponent, _super);
    function ContentDataComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backend = _this.injector.get(BackendService);
        _this.viewParams = {};
        _this.onData = new EventEmitter();
        return _this;
    }
    ContentDataComponent.prototype.setData = function (data) {
        if (this.data !== data) {
            this.data = data;
            this.onData.emit(data);
            this.onUpdate();
        }
    };
    ContentDataComponent.prototype.setError = function (error) {
    };
    ContentDataComponent.prototype.onUpdate = function () {
    };
    /** data lifecycle hook; called before data will be loaded with backend service */
    ContentDataComponent.prototype.onBeforeLoad = function () {
        this.updateContentState(KioContentState.loading);
    };
    /** data lifecycle hook; called after data was loaded with backend service */
    ContentDataComponent.prototype.onAfterLoad = function () {
        this.updateContentState(KioContentState.loaded);
    };
    ContentDataComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.updateContentState(KioContentState.idle);
    };
    ContentDataComponent.prototype.ngOnDestroy = function () {
        //this._contentStateChanges_debug.unsubscribe()
        _super.prototype.ngOnDestroy.call(this);
    };
    ContentDataComponent.prototype.ngAfterContentInit = function () {
    };
    ContentDataComponent.prototype.onNodeUpdate = function () {
        this.log('onNodeUpdate');
        _super.prototype.onNodeUpdate.call(this);
        if (this.node) {
            this.log('Loading content');
            this.loadNodeContent();
        }
    };
    ContentDataComponent.prototype.loadNodeContent = function () {
        var _this = this;
        this.onBeforeLoad();
        this.backend.loadNodeContent(this.node, {}).subscribe(function (response) {
            _this.setData(response.data);
            _this.onAfterLoad();
        });
    };
    return ContentDataComponent;
}(DataComponent));
export { ContentDataComponent };
/*protected logger=Object.assign(this.logger,{
  options: {
    ...this.logger.options,
    sourceUrl: true
  }
})*/
/*private _contentStateChanges_debug=window.afkm.logger.observe(this,'contentStateChanges',(subj,prop,value:KioContentState,idx)=>{
  return `content state: ${value} - "${KioContentState[value]}"`
})*/
ContentDataComponent.propDecorators = {
    'viewParams': [{ type: Input },],
    'onData': [{ type: Output },],
};
//# sourceMappingURL=content-data.component.js.map