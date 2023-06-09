import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { IUSerAccountService } from 'src/app/AppServices/AppWriteServices/AccountServices/Login/IUserAccountService';
import { IEventStatusBrokerService } from 'src/app/AppServices/AppWriteServices/EventServices/EventStatusService/IEventStatusBrokerService';
import { IEventBrokerService } from 'src/app/AppServices/AppWriteServices/EventServices/IEventBrokerService';
import { IUserBrokerService } from 'src/app/AppServices/AppWriteServices/UserServices/IUseBrokerService';
import { EventNotifier } from 'src/app/AppServices/SharedComponentServices/EventNotifier';
import { EventModel } from 'src/app/Models/EventModel';
import { PaginationSpecificationModel } from 'src/app/Models/QuerySpecificationModel';
import { EventMenuComponent } from '../../event-menu/event-menu.component';

@Component({
  selector: 'app-my-all-event-tab-panel',
  templateUrl: './my-all-event-tab-panel.component.html',
  styleUrls: ['./my-all-event-tab-panel.component.css'],
})
export class MyAllEventTabPanelComponent implements OnInit, OnDestroy {
  eventList: EventModel[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  @ViewChild('table') table: Table | undefined;
  first = 0;
  rows = 2;
  userId: string = '';

  //paging fields
  currentPageIndex: number = 0;
  pageOffset: number = this.rows;
  recordPerPage: number = this.rows;

  paginatedModel: PaginationSpecificationModel = {
    Limit: 0,
    Offset: 0,
  };

  // @ViewChild('childMenu') chMenu: EventMenuComponent | undefined;
  constructor(
    private userEventServie: IEventBrokerService,
    private userEventStatusService: IEventStatusBrokerService,
    private userService: IUserBrokerService,
    private userEventNotifier: EventNotifier
  ) {}

  ngOnInit(): void {
    this.userEventNotifier.subject.subscribe({
      next: async (value) => {
        await this.refresEventDataTable(value);
      },
      error: (e) => {},
      complete: () => {},
    });

    //fetch all the event of current user
  }

  async refresEventDataTable(eventId: string) {
    this.loadEventsDataInDataTable();
  }

  async lazyLoadEventsAsync(event: LazyLoadEvent) {
    this.userId = await this.userService.getCurrentLoggedInUserIdAsync();

    this.paginatedModel.Limit = event.rows != undefined ? event.rows : 0;
    this.paginatedModel.Offset = event.first != undefined ? event.first : 0;
    this.loading = true;
    await this.loadEventsDataInDataTable();
    this.loading = false;
  }

  async loadEventsDataInDataTable() {
    this.eventList = [];
    let response =
      await this.userEventServie.getAllEventsByUserIdByPaginatedModelAsync(
        this.userId,
        this.paginatedModel
      );
    this.totalRecords = response.TotalRecordCount;
    this.table?.totalRecords;

    if (response.IsValid) {
      this.eventList = response.Success;
      console.log(this.eventList);
    } else {
      //show errors
    }
  }

  ngOnDestroy(): void {
    this.userEventNotifier.subject.unsubscribe();
  }
}
