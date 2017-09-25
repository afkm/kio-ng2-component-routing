import { Injectable } from '@angular/core';
import { Observable, Scheduler } from 'rxjs'

export interface Size {
  width: number;
  height: number;
}

@Injectable()
export class ResizingService {

  constructor() { }

  getSize(w:Window=window):Size {
    return {
      width: w.innerWidth,
      height: w.innerHeight
    }
  }

  resize:Observable<Size>=Observable.fromEvent(window,'resize')
    .debounceTime(1000/30)
    .map ( e => this.getSize() )
    
}
