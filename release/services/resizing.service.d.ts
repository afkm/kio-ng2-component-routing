import { Observable } from 'rxjs';
export interface Size {
    width: number;
    height: number;
}
export declare class ResizingService {
    constructor();
    getSize(w?: Window): Size;
    resize: Observable<Size>;
}
