import { Component } from '@angular/core';
import { EventModel } from 'src/app/Models/EventModel';

@Component({
  selector: 'app-event-inbox',
  templateUrl: './event-inbox.component.html',
  styleUrls: ['./event-inbox.component.css']
})
export class EventInboxComponent {
    eventList:EventModel[]=[]
}
