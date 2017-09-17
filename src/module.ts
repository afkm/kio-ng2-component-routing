import { NgModule } from '@angular/core'
import { KioNg2i18nModule } from 'kio-ng2-i18n'
import { KioCtnModule, BackendService, DataDirective } from 'kio-ng2-ctn'
import { ComponentRouter } from './components/router/router.component'
import { ListComponentRouter } from './components/list-router/list-router.component'
import { RoutableComponent } from './decorators/component.decorator'
import { DataComponent, FragmentDataComponent, ContentDataComponent, TextDataComponent } from './components/base'
import { ContentLoaderDirective } from './directives/content-loader.directive'
import { ResizingService } from './services/resizing.service'
import * as Factory from './factory'
import { Mocking as mock } from './mocking'
import { ContentMockingService } from './mocking/service/content-mocking.service'

export { ResizingService } from './services/resizing.service'
export { ContentLoaderDirective } from './directives/content-loader.directive'
export { DataComponent, FragmentDataComponent, ContentDataComponent, TextDataComponent } from './components/base'
export { RoutableComponent } from './decorators/component.decorator'

export { Routable } from './interfaces/routable-component'
export { Annotation, FragmentAnnotation, ContentAnnotation } from './interfaces/annotation'
export { ComponentAnnotation } from './interfaces/component-annotation'
export { ComponentContentResolver } from './interfaces/content-resolver'

export { defaultStore } from './classes/component-store'
export { Factory, mock }
export { ContentMockingService } from './mocking/service/content-mocking.service'

export let RoutingComponents = [ ComponentRouter, ListComponentRouter, DataComponent, FragmentDataComponent, ContentDataComponent, TextDataComponent ]

@NgModule({
  imports:[
    KioNg2i18nModule,
    KioCtnModule
  ],
  declarations: [ 
    ...RoutingComponents, ContentLoaderDirective
  ],
  providers: [
    BackendService,
    ContentLoaderDirective,
    DataDirective,
    ResizingService
  ],
  entryComponents: [
    ...RoutingComponents
  ],
  exports: [
    KioNg2i18nModule,
    KioCtnModule,
    ...RoutingComponents
  ]
})
export class KioNg2ComponentRoutingModule {}