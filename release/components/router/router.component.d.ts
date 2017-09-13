import { EventEmitter, ComponentRef, Injector, OnChanges, ViewContainerRef, ElementRef } from '@angular/core';
import { KioFragmentModel, KioContentModel } from 'kio-ng2-data';
import { DataComponent, FragmentDataComponent, ContentDataComponent } from '../base';
export declare class ComponentRouter extends DataComponent<KioContentModel | KioFragmentModel> implements OnChanges {
    private componentFactoryResolver;
    cuid: string;
    componentName: string;
    viewParams: any;
    mount: EventEmitter<ComponentRef<any>>;
    unmount: EventEmitter<null>;
    componentIndex: number;
    mountPoint: ViewContainerRef;
    mountPointElement: ElementRef;
    protected onNodeUpdate(): void;
    protected mountedComponent: ComponentRef<FragmentDataComponent | ContentDataComponent>;
    protected unmountComponent(): void;
    protected createChildInjector(): Injector;
    protected mountComponent(): void;
    private _selectComponent();
}
