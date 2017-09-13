import { DataComponent } from './components/base';
export { ResizingService } from './services/resizing.service';
export { ContentLoaderDirective } from './directives/content-loader.directive';
export { DataComponent, FragmentDataComponent, ContentDataComponent, TextDataComponent } from './components/base';
export { RoutableComponent } from './decorators/component.decorator';
export { Routable } from './interfaces/routable-component';
export { Annotation, FragmentAnnotation, ContentAnnotation } from './interfaces/annotation';
export { ComponentAnnotation } from './interfaces/component-annotation';
export { ComponentContentResolver } from './interfaces/content-resolver';
export { defaultStore } from './classes/component-store';
export declare let RoutingComponents: typeof DataComponent[];
export declare class KioNg2ComponentRoutingModule {
}
