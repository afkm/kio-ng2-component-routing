import { Directive, ElementRef, Optional, Inject, ViewChildren, ContentChildren, HostListener, Output, EventEmitter } from '@angular/core';
import { CONTENT_RESOLVER } from '../content-resolver.token';
var ContentLoaderDirective = (function () {
    function ContentLoaderDirective(contentResolver, elementRef) {
        this.contentResolver = contentResolver;
        this.elementRef = elementRef;
        this.events = new EventEmitter();
        // this.logger.log('element',elementRef)
    }
    ContentLoaderDirective.prototype.emitEvent = function (event) {
        this.events.emit(event);
    };
    ContentLoaderDirective.prototype.onContentStateChanges = function (e) {
        // this.logger.log('onContentStateChanges',e)
    };
    ContentLoaderDirective.prototype.setNodeData = function (value) {
        // this.logger.log('nodeData',value)
    };
    ContentLoaderDirective.prototype.ngOnChanges = function (changes) {
        // this.logger.log('changes', Object.keys(changes))
    };
    ContentLoaderDirective.prototype.ngAfterViewInit = function () {
        // this.logger.log('AfterViewInit',this)
    };
    ContentLoaderDirective.prototype.ngAfterContentInit = function () {
        // this.logger.log('ngAfterContentInit',this)
    };
    return ContentLoaderDirective;
}());
export { ContentLoaderDirective };
/*protected logger=window.afkm.logger.cloneToScope(this,{
  labelStyle: {
    fontWeight: 'bold',
    fontSize: '19px'
  },
  label: this.debug_cuid
})*/
ContentLoaderDirective.decorators = [
    { type: Directive, args: [{
                selector: '*',
                queries: {
                    'childComponents': new ContentChildren(ContentLoaderDirective)
                }
            },] },
];
/** @nocollapse */
ContentLoaderDirective.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CONTENT_RESOLVER,] },] },
    { type: ElementRef, },
]; };
ContentLoaderDirective.propDecorators = {
    'childComponents': [{ type: ViewChildren, args: [ContentLoaderDirective,] },],
    'events': [{ type: Output },],
    'onContentStateChanges': [{ type: HostListener, args: ['contentDataChanges', ['$event'],] },],
};
//# sourceMappingURL=content-loader.directive.js.map