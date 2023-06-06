import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IGroupBrokerService } from 'src/app/AppServices/AppWriteServices/GroupServices/IGroupBrokerService';
import { IUserBrokerService } from 'src/app/AppServices/AppWriteServices/UserServices/IUseBrokerService';
import { GroupServiceNotifier } from 'src/app/AppServices/SharedComponentServices/GroupServiceNotifier';
import { EventModel } from 'src/app/Models/EventModel';
import { PaginationSpecificationModel } from 'src/app/Models/QuerySpecificationModel';
import { UserGroupComponent } from '../../../GroupComponents/user-group/user-group.component';
import { UsereventComponent } from '../../userevent/userevent.component';
import { EventmodalComponent } from '../eventmodal/eventmodal.component';

@Component({
  selector: 'app-my-event-tab-view-container',
  templateUrl: './my-event-tab-view-container.component.html',
  styleUrls: ['./my-event-tab-view-container.component.css'],
  providers: [DialogService, MessageService],
})
export class MyEventTabViewContainerComponent {
  eventList: EventModel[] = [];
  ref: DynamicDialogRef;
  constructor(
    public dialogService: DialogService,
    public messageService: MessageService
  ) {
    this.ref = new DynamicDialogRef();
  }

  paginatedModel: PaginationSpecificationModel = {
    Limit: 0,
    Offset: 0,
  };

  openEventDialogBox(eventId: string) {
    this.ref = this.dialogService.open(EventmodalComponent, {
      header: 'Contact',
      width: 'auto !important',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      closable: false,
      maximizable: false,
      data: {
        id: eventId,
      },
    });

    this.ref.onClose.subscribe((product) => {});

    // this.ref.onMaximize.subscribe((value) => {
    //     this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    // });
  }
}
