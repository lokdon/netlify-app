import { Component } from '@angular/core';
import { EventModel } from 'src/app/Models/EventModel';

@Component({
  selector: 'app-my-event-sent-tab-view',
  templateUrl: './my-event-sent-tab-view.component.html',
  styleUrls: ['./my-event-sent-tab-view.component.css']
})
export class MyEventSentTabViewComponent {
      eventList:EventModel[]=[]
}
