import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GroupModalComponent } from '../group-modal/group-modal.component';
import { ContactContainerComponent } from '../../ContactComponents/contact-container/contact-container.component';
import { group } from '@angular/animations';
import { GroupServiceNotifier } from 'src/app/AppServices/SharedComponentServices/GroupServiceNotifier';
import { GroupModel } from 'src/app/Models/GroupModel';
import { IGroupBrokerService } from 'src/app/AppServices/AppWriteServices/GroupServices/IGroupBrokerService';
import { IUserBrokerService } from 'src/app/AppServices/AppWriteServices/UserServices/IUseBrokerService';

@Component({
  selector: 'app-group-table-comp',
  templateUrl: './group-table-comp.component.html',
  styleUrls: ['./group-table-comp.component.css'],
  providers: [DialogService, MessageService]
})
export class GroupTableCompComponent implements OnInit {
  ref: DynamicDialogRef;

  groupList:GroupModel[]=[];
  totalRecords:number=0;
  loading:boolean =false;
  userId:string=''
  
  
  first = 0;

  rows = 5;
  
  
  constructor(public dialogService: DialogService, 
              public messageService: MessageService,
              public groupNotifier:GroupServiceNotifier,
              private groupService:IGroupBrokerService,
              private userService:IUserBrokerService) {
     
     this.ref = new DynamicDialogRef();
  }

 async ngOnInit() {
        this.groupNotifier.subject
        .subscribe({
          next:(async (message) => await this.refreshDataTable(message))
       });

       this.userId = await this.userService.getCurrentLoggedInUserIdAsync();
   }

   async refreshDataTable(messgae:string)
   {
      await this.loadGroupDataInDataTable();
   }


   loadGroups(event:Event)
   {

   }


   async loadGroupDataInDataTable()
   {
      this.groupService.getGroupListByUserIdAsync(this.userId);
   }
  
  show() {
      this.ref = this.dialogService.open(GroupModalComponent, {
          header: 'Group',
          width: '35%',
          height:'50%',
          contentStyle: { overflow: 'hidden' },
          baseZIndex: 10000,
          closable: false
          //maximizable: true
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

        next() {
          this.first = this.first + this.rows;
      }

      prev() {
          this.first = this.first - this.rows;
      }

      reset() {
          this.first = 0;
      }

      isLastPage(): boolean {
          return false
      }

      isFirstPage(): boolean {
          return false
      }
}
