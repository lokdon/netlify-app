import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventNotifier {
  recordId: string = '';

  constructor() {}

  public subject = new Subject<string>();
  //private messageSource = new  BehaviorSubject(this.recordId);

  //currentMessage = this.messageSource.asObservable();

  InvokeEventNotifier(message: string) {
    this.subject.next(message);
    //this.messageSource.next(message)
  }
}
