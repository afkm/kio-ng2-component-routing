import { AfterViewInit, AfterContentInit, OnChanges, SimpleChanges, ElementRef, QueryList, EventEmitter } from '@angular/core';
import { ComponentContentResolver } from '../interfaces/content-resolver';
export declare class ContentLoaderDirective implements OnChanges, AfterViewInit, AfterContentInit {
    readonly contentResolver: ComponentContentResolver;
    elementRef: ElementRef;
    constructor(contentResolver: ComponentContentResolver, elementRef: ElementRef);
    childComponents: QueryList<ContentLoaderDirective>;
    events: EventEmitter<string>;
    emitEvent(event: string): void;
    onContentStateChanges(e: any): void;
    setNodeData(value: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
}
