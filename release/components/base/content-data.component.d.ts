import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { EventEmitter, OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentInit } from '@angular/core';
import { KioContentModel } from 'kio-ng2-data';
import { BackendService } from 'kio-ng2-ctn';
import { DataComponent } from './data.component';
export declare class ContentDataComponent extends DataComponent<KioContentModel> implements OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentInit {
    readonly node: KioContentModel;
    protected backend: BackendService;
    viewParams: any;
    onData: EventEmitter<any>;
    data: any;
    setData(data: any): void;
    setError(error: Error): void;
    protected onUpdate(): void;
    /** data lifecycle hook; called before data will be loaded with backend service */
    onBeforeLoad(): void;
    /** data lifecycle hook; called after data was loaded with backend service */
    onAfterLoad(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    protected onNodeUpdate(): void;
    protected loadNodeContent(): void;
}
