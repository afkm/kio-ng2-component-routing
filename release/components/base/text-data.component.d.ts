import { OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentInit } from '@angular/core';
import { ContentDataComponent } from './content-data.component';
export declare class TextDataComponent extends ContentDataComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentInit {
    text: string;
    data: {
        text: string;
    };
    protected onUpdate(): void;
}
