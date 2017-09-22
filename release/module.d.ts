import { DataComponent } from './components/base';
import * as Factory from './factory';
import { Mocking as mock } from './mocking';
export { ResizingService } from './services/resizing.service';
export { ContentLoaderDirective } from './directives/content-loader.directive';
export { DataComponent, FragmentDataComponent, ContentDataComponent, TextDataComponent } from './components/base';
export { RoutableComponent } from './decorators/component.decorator';
export { Routable } from './interfaces/routable-component';
export { ViewParams } from './interfaces/view-params';
export { Annotation, FragmentAnnotation, ContentAnnotation } from './interfaces/annotation';
export { ComponentAnnotation } from './interfaces/component-annotation';
export { ComponentContentResolver } from './interfaces/content-resolver';
export { defaultStore } from './classes/component-store';
export { Factory, mock };
export { ContentMockingService } from './mocking/service/content-mocking.service';
export declare let RoutingComponents: typeof DataComponent[];
export declare class KioNg2ComponentRoutingModule {
}
