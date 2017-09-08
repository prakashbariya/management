import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ProgressBarService {
  public updateProgressBar$: EventEmitter<any>;

  private requestsRunning = 0;

  constructor() {
    this.updateProgressBar$ = new EventEmitter();
  }
}
