import { Component, OnInit } from '@angular/core';
import { IEventBrokerService } from 'src/app/AppServices/AppWriteServices/EventServices/IEventBrokerService';
import { EventModelMVVM } from 'src/app/Models/EventModel';

@Component({
  selector: 'app-userevent',
  templateUrl: './userevent.component.html',
  styleUrls: ['./userevent.component.css'],
})
export class UsereventComponent implements OnInit {
  eventList: EventModelMVVM[] = [];
  totalRecords: number = 3;
  loading: boolean = false;

  constructor(private eventBrokerService: IEventBrokerService) {}

  ngOnInit(): void {
    //this.eventList =  this.eventBrokerService.getEventWithStatusHistoryByUserIdAndEventIdAsync('1','1');
  }

  async loadEvents(event: any) {
    // alert('lazy load called');
    // this.eventList = [];
    // this.eventList =  this.eventBrokerService.getEventWithStatusHistoryByUserIdAndEventIdAsync('1','1');
    // console.log(this.eventList);
  }
}
