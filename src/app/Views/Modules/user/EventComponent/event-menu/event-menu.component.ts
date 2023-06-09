import { Component, Input, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Menu } from 'primeng/menu';
import { EventmodalComponent } from '../MyEvents/eventmodal/eventmodal.component';

@Component({
  selector: 'app-event-menu',
  templateUrl: './event-menu.component.html',
  styleUrls: ['./event-menu.component.css'],
  providers: [MessageService, DialogService],
})
export class EventMenuComponent {
  items: MenuItem[] = [];
  ref: DynamicDialogRef;
  @Input('eventId') eventId: string = '';
  // @ViewChild('menu') menu: Menu | undefined;

  // @ViewChild('menuButton') menuButton: Button | undefined;

  constructor(
    private messageService: MessageService,
    public dialogService: DialogService
  ) {
    this.ref = new DynamicDialogRef();
  }

  ngOnInit() {
    this.items = [
      {
        items: [
          {
            label: 'Add Guests',
            icon: 'pi pi-users',
            command: () => {
              this.update();
            },
          },
          {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
              this.update();
            },
          },
          {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
              this.delete();
            },
          },
        ],
      },
      {
        label: 'Navigate',
        items: [
          {
            label: 'Angular',
            icon: 'pi pi-external-link',
            url: 'http://angular.io',
          },
          {
            label: 'Router',
            icon: 'pi pi-upload',
            routerLink: '/fileupload',
          },
        ],
      },
    ];
  }

  addGuest() {
    //open modal dilaog box to show add guest modal box
  }

  update() {
    //open modal box to edit event properties
    this.ref = this.dialogService.open(EventmodalComponent, {
      header: 'Contact',
      width: 'auto !important',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      closable: false,
      maximizable: false,
      data: {
        id: this.eventId,
      },
    });

    this.ref.onClose.subscribe((product) => {});

    // this.ref.onMaximize.subscribe((value) => {
    //     this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    // });

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Updated',
    });
    alert('update function called');
  }

  delete() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Delete',
      detail: 'Data Deleted',
    });
    alert('delete function called');
  }
}
