import { NgModule } from '@angular/core';
import { KioNg2i18nModule } from 'kio-ng2-i18n';
import { KioCtnModule, BackendService, DataDirective } from 'kio-ng2-ctn';
import { ComponentRouter } from './components/router/router.component';
import { ListComponentRouter } from './components/list-router/list-router.component';
import { DataComponent, FragmentDataComponent, ContentDataComponent, TextDataComponent } from './components/base';
import { ContentLoaderDirective } from './directives/content-loader.directive';
import { ResizingService } from './services/resizing.service';
import * as Factory from './factory';
import { Mocking as mock } from './mocking';
export { ResizingService } from './services/resizing.service';
export { ContentLoaderDirective } from './directives/content-loader.directive';
export { DataComponent, FragmentDataComponent, ContentDataComponent, TextDataComponent } from './components/base';
export { RoutableComponent } from './decorators/component.decorator';
export { defaultStore } from './classes/component-store';
export { Factory, mock };
export { ContentMockingService } from './mocking/service/content-mocking.service';
export var RoutingComponents = [ComponentRouter, ListComponentRouter, DataComponent, FragmentDataComponent, ContentDataComponent, TextDataComponent];
var KioNg2ComponentRoutingModule = (function () {
    function KioNg2ComponentRoutingModule() {
    }
    return KioNg2ComponentRoutingModule;
}());
export { KioNg2ComponentRoutingModule };
KioNg2ComponentRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    KioNg2i18nModule,
                    KioCtnModule
                ],
                declarations: RoutingComponents.concat([
                    ContentLoaderDirective
                ]),
                providers: [
                    BackendService,
                    ContentLoaderDirective,
                    DataDirective,
                    ResizingService
                ],
                entryComponents: RoutingComponents.slice(),
                exports: [
                    KioNg2i18nModule,
                    KioCtnModule
                ].concat(RoutingComponents)
            },] },
];
/** @nocollapse */
KioNg2ComponentRoutingModule.ctorParameters = function () { return []; };
//# sourceMappingURL=module.js.map