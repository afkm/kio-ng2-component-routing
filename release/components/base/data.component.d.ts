import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { EventEmitter, ElementRef, SimpleChanges, SimpleChange, OnChanges, Injector } from '@angular/core';
import { KioContentModel, KioFragmentModel, KioPublicationModel, KioContentState } from 'kio-ng2-data';
import { ScrollService, ScrollDirection, ScrollMargin } from 'kio-ng2-scrolling';
import { ComponentContentResolver } from '../../interfaces/content-resolver';
import { Node } from '../../interfaces/data-component';
import { StatefulComponent } from './stateful.component';
import { ComponentState } from '../../enums/component-state.enum';
export declare class DataComponent<T extends KioContentModel | KioFragmentModel | KioPublicationModel> extends StatefulComponent implements OnChanges, Node<T> {
    protected node: T;
    readonly contentResolver: ComponentContentResolver;
    protected scrollService: ScrollService;
    readonly injector: Injector;
    constructor(node: T, contentResolver: ComponentContentResolver, scrollService: ScrollService, injector: Injector);
    /** observable of component state changes */
    protected outputNodeEmitter: EventEmitter<T>;
    inputNode: T;
    readonly outputNode: Observable<T>;
    contentStateChanges: EventEmitter<SimpleChange>;
    contentState: KioContentState;
    viewParams: any;
    canAnimateContent: boolean;
    protected didUpdate: boolean;
    protected onNodeUpdate(): void;
    setData(data: any): void;
    setError(error: Error): void;
    protected onUpdate(): void;
    onBeforeLoad(): void;
    onAfterLoad(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    /** node lifecycle hook; called once the node property has been updated */
    protected updateNode(nextNode: T): void;
    protected updateContentState(nextState: KioContentState): void;
    private _assignNode(node);
    private _emitNode(node);
    /**
     * scroll handling
     */
    protected _scrollServiceSubscription: Subscription;
    protected startScrollTracking(scrollMargins: ScrollMargin[], element: ElementRef): void;
    protected stopScrollTracking(): void;
    protected onScrollMarginUpdates(positions: number[], direction?: ScrollDirection): void;
    protected componentStatesForContentState(contentState: KioContentState): ComponentState[];
    private _contentStates;
}
