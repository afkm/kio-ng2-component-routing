import 'rxjs/add/operator/mergeMap';
import { EventEmitter } from '@angular/core';
import { ComponentState } from '../../enums/component-state.enum';
var StatefulComponent = (function () {
    function StatefulComponent() {
        this._changeEmitter = new EventEmitter();
        /** observable of component state changes */
        this.componentState = this._changeEmitter.asObservable();
    }
    Object.defineProperty(StatefulComponent.prototype, "currentComponentState", {
        /** current component state */
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    StatefulComponent.prototype.ngOnInit = function () {
        this.updateComponentState(ComponentState.mounting);
    };
    StatefulComponent.prototype.ngOnDestroy = function () {
        this.updateComponentState(ComponentState.unmounting);
    };
    StatefulComponent.prototype.ngAfterViewInit = function () {
        this.updateComponentState(ComponentState.mounted);
    };
    StatefulComponent.prototype.updateComponentState = function (nextState) {
        if ('string' === typeof nextState) {
            return this.updateComponentState(ComponentState[nextState]);
        }
        if (this._state !== nextState) {
            this.log('update state from %s to %s', ComponentState[this._state], ComponentState[nextState]);
            var oldState_1 = this._state;
            this._state = nextState;
            this._changeEmitter.emit({
                currentValue: nextState,
                previousValue: oldState_1,
                firstChange: oldState_1 === undefined,
                isFirstChange: function () { return oldState_1 === undefined; }
            });
        }
    };
    /*protected logger=window.afkm.logger.cloneToScope(this,{
      time: false,
      labelStyle: {
        color: '#33f9e1'
      }
    })*/
    StatefulComponent.prototype.log = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        //this.logger.log(format, ...args)
    };
    return StatefulComponent;
}());
export { StatefulComponent };
//# sourceMappingURL=stateful.component.js.map