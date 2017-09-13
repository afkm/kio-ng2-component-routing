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
import { Observable } from 'rxjs/Observable';
import { Input, Output, Component, EventEmitter, Injector, Optional, Host, Inject } from '@angular/core';
import { KioContentState } from 'kio-ng2-data';
import { ScrollService } from 'kio-ng2-scrolling';
import { DataDirective } from 'kio-ng2-ctn';
import { ContentLoaderDirective } from '../../directives/content-loader.directive';
import { NODE_MODEL } from '../../node-model.token';
import { CONTENT_RESOLVER } from '../../content-resolver.token';
import { StatefulComponent } from './stateful.component';
import { ComponentState } from '../../enums/component-state.enum';
var DataComponent = (function (_super) {
    __extends(DataComponent, _super);
    function DataComponent(node, contentResolver, scrollService, injector) {
        var _this = _super.call(this) || this;
        _this.node = node;
        _this.contentResolver = contentResolver;
        _this.scrollService = scrollService;
        _this.injector = injector;
        /** observable of component state changes */
        _this.outputNodeEmitter = new EventEmitter();
        _this.contentStateChanges = new EventEmitter();
        _this.canAnimateContent = true;
        _this.didUpdate = false;
        _this._contentStates = _this.contentStateChanges.concatMap(function (contentStateChange) {
            var componentStates = _this.componentStatesForContentState(contentStateChange.currentValue);
            return Observable.of.apply(Observable, componentStates);
        }).subscribe(function (componentState) {
            _this.contentResolver.updateComponentState(_this, componentState);
        });
        if (_this.contentResolver) {
            if (!_this.node) {
                // is child component
                _this.contentResolver.subscribeTo(_this, _this.componentState.map(function (up) { return up.currentValue; }));
            }
            else {
                _this.contentResolver.completed.subscribe(function () {
                    _this.log('COMPLETED LOADING');
                }, console.error, function () {
                    _this.log('all done');
                });
            }
        }
        else {
            _this.log('Was initialized without a content resolver.');
        }
        return _this;
    }
    Object.defineProperty(DataComponent.prototype, "outputNode", {
        get: function () {
            return this.outputNodeEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DataComponent.prototype.onNodeUpdate = function () {
        this.didUpdate = true;
    };
    DataComponent.prototype.setData = function (data) {
    };
    DataComponent.prototype.setError = function (error) {
    };
    DataComponent.prototype.onUpdate = function () {
    };
    DataComponent.prototype.onBeforeLoad = function () {
        //this.updateContentState(KioContentState.loading)
    };
    DataComponent.prototype.onAfterLoad = function () {
        //this.updateContentState(KioContentState.loaded)
    };
    DataComponent.prototype.ngOnInit = function () {
        //this.updateContentState(KioContentState.idle)
        _super.prototype.ngOnInit.call(this);
    };
    DataComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    DataComponent.prototype.ngOnChanges = function (changes) {
        if ('inputNode' in changes) {
            var nodeChange = changes['inputNode'];
            this.log('changed inputNode', nodeChange);
            if (nodeChange.currentValue && (!nodeChange.firstChange || !this.node)) {
                this.updateNode(nodeChange.currentValue);
            }
        }
    };
    DataComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //this.log('ngAfterViewInit', this.childComponents)
        _super.prototype.ngAfterViewInit.call(this);
        if (this.didUpdate === false && this.node) {
            process.nextTick(function () {
                _this.onNodeUpdate();
            });
        }
    };
    /** node lifecycle hook; called once the node property has been updated */
    DataComponent.prototype.updateNode = function (nextNode) {
        if (this.node !== (nextNode || null)) {
            this._assignNode(nextNode);
        }
    };
    /*protected log ( format:string, ...args:any[] ) {
      console.log( '%c%s (%s)%c '+format, 'color: orange; font-weight: bold;', this.constructor.name, this.debug_id, 'color: black; font-size: normal', ...args )
    }*/
    DataComponent.prototype.updateContentState = function (nextState) {
        if (this.contentState !== nextState) {
            var oldState_1 = this.contentState;
            this.contentState = nextState;
            this.contentStateChanges.emit({
                currentValue: nextState,
                previousValue: oldState_1,
                firstChange: oldState_1 === undefined,
                isFirstChange: function () { return oldState_1 === undefined; }
            });
        }
    };
    DataComponent.prototype._assignNode = function (node) {
        var _this = this;
        process.nextTick(function () {
            _this.node = node;
            _this._emitNode(node);
        });
    };
    DataComponent.prototype._emitNode = function (node) {
        this.outputNodeEmitter.emit(node);
        this.onNodeUpdate();
    };
    DataComponent.prototype.startScrollTracking = function (scrollMargins, element) {
        var _this = this;
        if (!this.scrollService) {
            return;
        }
        this._scrollServiceSubscription = this.scrollService.registerComponent(this, scrollMargins, element)
            .subscribe(function (_a) {
            var positions = _a.positions, direction = _a.direction;
            _this.onScrollMarginUpdates(positions, direction);
        });
    };
    DataComponent.prototype.stopScrollTracking = function () {
        if (this._scrollServiceSubscription) {
            this._scrollServiceSubscription.unsubscribe();
            this._scrollServiceSubscription = null;
        }
    };
    DataComponent.prototype.onScrollMarginUpdates = function (positions, direction) {
        //this.allMarginsVisible = positions.every(pos => pos >= 0 && pos <= 1)
    };
    DataComponent.prototype.componentStatesForContentState = function (contentState) {
        var state = contentState;
        var componentStates = [];
        switch (state) {
            case KioContentState.idle:
                componentStates.push(ComponentState.mounting);
                break;
            case KioContentState.loading:
                componentStates.push(ComponentState.mounted, ComponentState.loading);
                break;
            case KioContentState.loaded:
                componentStates.push(ComponentState.loaded);
                break;
            case KioContentState.unmounting:
                componentStates.push(ComponentState.unmounting);
                break;
        }
        return componentStates;
    };
    return DataComponent;
}(StatefulComponent));
export { DataComponent };
DataComponent.decorators = [
    { type: Component, args: [{
                template: '',
                selector: 'data-component',
                providers: [
                    /*{
                      provide: CONTENT_RESOLVER,
                      useFactory: contentResolverFactory,
                      deps: [NODE_MODEL]
                    },*/
                    ContentLoaderDirective,
                    DataDirective
                ]
            },] },
];
/** @nocollapse */
DataComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Optional }, { type: Host }, { type: Inject, args: [NODE_MODEL,] },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CONTENT_RESOLVER,] },] },
    { type: ScrollService, decorators: [{ type: Inject, args: [ScrollService,] },] },
    { type: Injector, },
]; };
DataComponent.propDecorators = {
    'inputNode': [{ type: Input, args: ['node',] },],
    'outputNode': [{ type: Output, args: ['node',] },],
    'contentStateChanges': [{ type: Output },],
    'viewParams': [{ type: Input },],
};
//# sourceMappingURL=data.component.js.map