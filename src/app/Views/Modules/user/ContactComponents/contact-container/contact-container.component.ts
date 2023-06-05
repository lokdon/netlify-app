import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GroupServiceNotifier } from 'src/app/AppServices/SharedComponentServices/GroupServiceNotifier';
import { GroupModel } from 'src/app/Models/GroupModel';
import { IGroupBrokerService } from 'src/app/AppServices/AppWriteServices/GroupServices/IGroupBrokerService';
import { IUserBrokerService } from 'src/app/AppServices/AppWriteServices/UserServices/IUseBrokerService';
import { PaginationSpecificationModel } from 'src/app/Models/QuerySpecificationModel';
import { Table } from 'primeng/table';
import { AddContactModalComponent } from '../add-contact-modal/add-contact-modal.component';
import { ContactsModel } from 'src/app/Models/ContactsModel';
import { IContactService } from 'src/app/AppServices/AppWriteServices/ContactServices/IContactService';
import { ContactNotifier } from 'src/app/AppServices/SharedComponentServices/ContactNotifier';


@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.css'],
  providers:[DialogService,MessageService]
})

export class ContactContainerComponent implements OnInit  {
  ref: DynamicDialogRef;

  contactList:ContactsModel[]=[];
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
              public contactNotifier:ContactNotifier,
              private contactService:IContactService,
              private userService:IUserBrokerService) {
     
     this.ref = new DynamicDialogRef();
    
  }

   paginatedModel:PaginationSpecificationModel={
    Limit: 0,
    Offset: 0
  } 

 async ngOnInit() {
        this.contactNotifier.subject
        .subscribe({
          next:(async (message) => await this.refreshDataTable(message))
       });
   }

   async refreshDataTable(message:string)
   {
        this.paginatedModel.Limit = this.rows
        this.paginatedModel.Offset = 0;
        
        this.loading = true;  
        await this.loadContactDataInDataTable();
        if (this.table) {
            this.lazyLoadContactsAsync(this.table.createLazyLoadMetadata());
         }

         this.loading =false;
   }


   openContactDialogBox(contactRecordId:string) {
    this.ref = this.dialogService.open(AddContactModalComponent, {
        header: 'Contact',
        width: '100%',
        height:'100%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        closable: true,
        maximizable: true,
        data:{
          contactRecordId:contactRecordId
        }
    },
    );

    this.ref.onClose.subscribe((product) => {
        alert('closing the dialog box')
    });

    // this.ref.onMaximize.subscribe((value) => {
    //     this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    // });    

}

   async lazyLoadContactsAsync(event:LazyLoadEvent)
   {
    this.userId = await this.userService.getCurrentLoggedInUserIdAsync();
     
    this.paginatedModel.Limit = event.rows!=undefined? event.rows:0;
     this.paginatedModel.Offset = event.first!=undefined? event.first:0;
    this.loading = true;    
    await this.loadContactDataInDataTable();
    this.loading = false;
   }


   async loadContactDataInDataTable()
   {
      this.contactList =[];
      console.log(this.userId);
      let response = await this.contactService.getPaginatedContactListByUserIdAsync(this.userId,this.paginatedModel)
      this.totalRecords = response.TotalRecordCount;
      this.table?.totalRecords

      console.log(this.totalRecords);
      
      if(response.IsValid)
      {
        this.contactList =response.Success;
        console.log(this.contactList);
      }else{
        //show errors

      }
      
   }
  
  show() {
      this.ref = this.dialogService.open(AddContactModalComponent, {
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
       
}

