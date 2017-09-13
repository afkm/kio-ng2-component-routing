import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/window';
import { EventEmitter } from '@angular/core';
import { KioContentModel, KioFragmentModel, KioPublicationModel } from 'kio-ng2-data';
import { ComponentContentResolver } from '../interfaces/content-resolver';
import { Node } from '../interfaces/data-component';
import { ComponentState } from '../enums/component-state.enum';
export declare class ContentResolver {
    readonly parentModel: KioFragmentModel | KioPublicationModel;
    readonly parentResolver: ComponentContentResolver;
    constructor(parentModel: KioFragmentModel | KioPublicationModel, parentResolver?: ComponentContentResolver);
    protected componentStateEmitter: EventEmitter<[Node<KioContentModel | KioFragmentModel>, ComponentState]>;
    componentStates: Observable<[Node<KioContentModel | KioFragmentModel>, ComponentState]>;
    /** @type {Observable<Node<KioModel>>} observable of components which resolve their content data with this instance */
    childComponents: Observable<Node<KioContentModel | KioFragmentModel>[]>;
    protected mounted: Observable<[Node<KioContentModel | KioFragmentModel>, ComponentState]>;
    protected mounting: Observable<[Node<KioContentModel | KioFragmentModel>, ComponentState]>;
    protected mountIntervals: Observable<[Node<KioContentModel | KioFragmentModel>, ComponentState][]>;
    completed: Observable<boolean>;
    updateComponentState(component: Node<KioContentModel | KioFragmentModel>, componentState: ComponentState): void;
    subscribeTo(component: Node<KioContentModel | KioFragmentModel>, stateObservable: Observable<ComponentState>): Subscription;
}
