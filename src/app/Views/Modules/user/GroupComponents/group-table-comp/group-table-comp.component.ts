import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GroupModalComponent } from '../group-modal/group-modal.component';
import { ContactContainerComponent } from '../../ContactComponents/contact-container/contact-container.component';
import { group } from '@angular/animations';
import { GroupServiceNotifier } from 'src/app/AppServices/SharedComponentServices/GroupServiceNotifier';
import { GroupModel } from 'src/app/Models/GroupModel';
import { IGroupBrokerService } from 'src/app/AppServices/AppWriteServices/GroupServices/IGroupBrokerService';
import { IUserBrokerService } from 'src/app/AppServices/AppWriteServices/UserServices/IUseBrokerService';
import { PaginationSpecificationModel } from 'src/app/Models/QuerySpecificationModel';
import { Table } from 'primeng/table';
import { UserGroupComponent } from '../user-group/user-group.component';

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

  @ViewChild('table') table: Table | undefined;
  
  first = 0;

  rows = 2;

  //paging fields
  currentPageIndex:number=0;
  pageOffset:number = this.rows;
  recordPerPage:number=this.rows;
  
  constructor(public dialogService: DialogService, 
              public messageService: MessageService,
              public groupNotifier:GroupServiceNotifier,
              private groupService:IGroupBrokerService,
              private userService:IUserBrokerService) {
     
     this.ref = new DynamicDialogRef();
    
  }

   paginatedModel:PaginationSpecificationModel={
    Limit: 0,
    Offset: 0
  } 

 async ngOnInit() {
        this.groupNotifier.subject
        .subscribe({
          next:(async (message) => await this.refreshDataTable(message))
       });

       this.userId = await this.userService.getCurrentLoggedInUserIdAsync();
   }

   async refreshDataTable(message:string)
   {
        this.paginatedModel.Limit = this.rows
        this.paginatedModel.Offset = 0;
        
        this.loading = true;  
        await this.loadGroupDataInDataTable();
        if (this.table) {
            this.lazyLoadGroupsAsync(this.table.createLazyLoadMetadata());
         }

         this.loading =false;
   }

   addContact(recordId:string)
   {
    this.openAddContactDialogBox()
   }


   openAddContactDialogBox() {
    this.ref = this.dialogService.open(UserGroupComponent, {
        header: 'Contact',
        width: '100%',
        height:'100%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        closable: true,
        maximizable: true,
        
    });

    this.ref.onClose.subscribe((product) => {
        alert('closing the dialog box')
    });

    // this.ref.onMaximize.subscribe((value) => {
    //     this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    // });    

}

   async lazyLoadGroupsAsync(event:LazyLoadEvent)
   {
    
     this.paginatedModel.Limit = event.rows!=undefined? event.rows:0;
     this.paginatedModel.Offset = event.first!=undefined? event.first:0;
    
    console.log(event);
    this.loading = true;    
    await this.loadGroupDataInDataTable();
    this.loading = false;
   }


   async loadGroupDataInDataTable()
   {
      this.groupList =[];

      let response = await this.groupService.getPaginatedGroupListByUserIdAsync(this.userId, this.paginatedModel);
      this.totalRecords = response.TotalRecordCount;
      this.table?.totalRecords

      console.log(this.totalRecords);
      
      if(response.IsValid)
      {
        this.groupList =response.Success;
        console.log(this.groupList);
      }else{
        //show errors

      }
      
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
            this.currentPageIndex ++;
           
            if (this.table) {
                this.lazyLoadGroupsAsync(this.table.createLazyLoadMetadata());
             }
      }



      prev() {
        
        
        this.currentPageIndex --;
        if(this.currentPageIndex<0)
        {
            this.currentPageIndex=1;
        }
        console.log(this.currentPageIndex);
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
