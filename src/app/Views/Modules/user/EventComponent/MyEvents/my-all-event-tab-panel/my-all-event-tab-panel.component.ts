import { Component } from '@angular/core';
import { EventModel } from 'src/app/Models/EventModel';

@Component({
  selector: 'app-my-all-event-tab-panel',
  templateUrl: './my-all-event-tab-panel.component.html',
  styleUrls: ['./my-all-event-tab-panel.component.css']
})
export class MyAllEventTabPanelComponent {
  eventList:EventModel[]=[]
}
