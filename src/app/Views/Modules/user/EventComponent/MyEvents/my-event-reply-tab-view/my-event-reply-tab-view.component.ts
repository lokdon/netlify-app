import { Component } from '@angular/core';
import { EventModel } from 'src/app/Models/EventModel';

@Component({
  selector: 'app-my-event-reply-tab-view',
  templateUrl: './my-event-reply-tab-view.component.html',
  styleUrls: ['./my-event-reply-tab-view.component.css']
})
export class MyEventReplyTabViewComponent {
  eventList:EventModel[]=[]
}
