import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GroupModalComponent } from '../group-modal/group-modal.component';
import { ContactContainerComponent } from '../../ContactComponents/contact-container/contact-container.component';
import { group } from '@angular/animations';

@Component({
  selector: 'app-group-table-comp',
  templateUrl: './group-table-comp.component.html',
  styleUrls: ['./group-table-comp.component.css'],
  providers: [DialogService, MessageService]
})
export class GroupTableCompComponent {
  ref: DynamicDialogRef;
  constructor(public dialogService: DialogService, public messageService: MessageService) {
     this.ref = new DynamicDialogRef();
  }

  show() {
      this.ref = this.dialogService.open(GroupModalComponent, {
          header: 'Select a Product',
          width: '65%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true
      });

      // this.ref.onClose.subscribe((product: Product) => {
      //     if (product) {
      //         this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
      //     }
      // });

      // this.ref.onMaximize.subscribe((value) => {
      //     this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
      // });    

 }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
