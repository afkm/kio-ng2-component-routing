import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { SimpleChange, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ComponentState } from '../../enums/component-state.enum';
export declare class StatefulComponent implements OnInit, OnDestroy, AfterViewInit {
    private _changeEmitter;
    /** current component state */
    readonly currentComponentState: ComponentState;
    /** observable of component state changes */
    componentState: Observable<SimpleChange>;
    private _state;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    protected updateComponentState(nextState: ComponentState | keyof typeof ComponentState): void;
    protected log(format: string, ...args: any[]): void;
}
