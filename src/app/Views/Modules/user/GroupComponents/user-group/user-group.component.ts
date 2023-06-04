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
import { ContactsModel } from 'src/app/Models/ContactsModel';
import { IContactService } from 'src/app/AppServices/AppWriteServices/ContactServices/IContactService';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css'],
  providers: [DialogService, MessageService]
})
export class UserGroupComponent implements OnInit {
  ref: DynamicDialogRef;

  contactList:ContactsModel[]=[];
  selectedContacts: ContactsModel[]=[];
  totalRecords:number=0;
  loading:boolean =false;
  userId:string=''

  @ViewChild('table') table: Table | undefined;
  
  first = 0;

  rows = 5;

  //paging fields
  currentPageIndex:number=0;
  pageOffset:number = this.rows;
  recordPerPage:number=this.rows;
  
  constructor(public dialogService: DialogService, 
              public messageService: MessageService,
              private contactService:IContactService,
              private userService:IUserBrokerService) {
     
     this.ref = new DynamicDialogRef();

    
  }

   paginatedModel:PaginationSpecificationModel={
    Limit: 0,
    Offset: 0
  } 

 async ngOnInit() {
      //   this.groupNotifier.subject
      //   .subscribe({
      //     next:(async (message) => await this.refreshDataTable(message))
      //  });

       this.userId = await this.userService.getCurrentLoggedInUserIdAsync();
   }

   async lazyLoadContactsAsync(event:LazyLoadEvent)
   {
    
    this.paginatedModel.Limit = event.rows!=undefined? event.rows:0;
     this.paginatedModel.Offset = event.first!=undefined? event.first:0;
     this.loading = true;    
     await this.loadContactDataInDataTable();
     this.loading = false;
   }


   async loadContactDataInDataTable()
   {
      this.contactList =[];
      console.log(this.paginatedModel);
      let response = await this.contactService.getPaginatedContactListByUserIdAsync(this.userId, this.paginatedModel);
      this.totalRecords = response.TotalRecordCount;
      alert(response.IsValid)
      if(response.IsValid)
      {
        this.contactList =response.Success;
        console.log(this.contactList);
      }else{
        //show errors

      }
      
   }

   saveSelectedContact()
   {
     alert('contact saved');
     console.log(this.selectedContacts);
   }
  
 
}

