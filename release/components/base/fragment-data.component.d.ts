import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { QueryList, ViewContainerRef } from '@angular/core';
import { KioFragmentModel } from 'kio-ng2-data';
import { DataComponent } from './data.component';
import { ComponentData } from '../../types/component-data';
import { Node } from '../../interfaces/data-component';
export declare class FragmentDataComponent extends DataComponent<KioFragmentModel> {
    protected node: KioFragmentModel;
    childComponents: QueryList<ViewContainerRef>;
    protected childElements: Observable<Node<ComponentData>[]>;
    protected childElementsLoaded: Observable<DataComponent<ComponentData>>;
    ngAfterViewInit(): void;
    protected onChildDataComponentLoaded<T extends ComponentData>(childComponent: Node<T>): void;
    private _childDataComponentStates;
    private _childContentStates;
}
