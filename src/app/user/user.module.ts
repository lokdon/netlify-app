import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FilesComponent } from './files/files.component';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenerateQuestionsAnsComponent } from './generate-questions-ans/generate-questions-ans.component';
import { ICategoryBrokerService } from '../AppServices/AppWriteServices/CategoryService/ICategoryBrokerService';
import { CategoryBrokerService } from '../AppServices/AppWriteServices/CategoryService/category-broker.service';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { IUserBrokerService } from '../AppServices/AppWriteServices/UserServices/IUseBrokerService';
import { UserBrokerService } from '../AppServices/AppWriteServices/UserServices/user-broker.service';
import { IStorageBrokerService } from '../AppServices/AppWriteServices/FileServices/IStorageBrokerService';
import { StorageBrokerService } from '../AppServices/AppWriteServices/FileServices/storagebroker.service';
import { SidebarModule } from 'primeng/sidebar';
import { UsereventComponent } from './EventComponent/userevent/userevent.component';
import { IEventBrokerService } from '../AppServices/AppWriteServices/EventServices/IEventBrokerService';
import { EventBrokerService } from '../AppServices/AppWriteServices/EventServices/event-broker-service.service';

import { AddContactModalComponent } from './ContactComponents/add-contact-modal/add-contact-modal.component';
import { ContactContainerComponent } from './ContactComponents/contact-container/contact-container.component';
import { IContactService } from '../AppServices/AppWriteServices/ContactServices/IContactService';
import { ContactsService } from '../AppServices/AppWriteServices/ContactServices/contacts.service';
import { IAddressService } from '../AppServices/AppWriteServices/AddressServices/IAddressService';
import { AddressService } from '../AppServices/AppWriteServices/AddressServices/address.service';
import { GroupTableCompComponent } from './GroupComponents/group-table-comp/group-table-comp.component';
import { GroupModalComponent } from './GroupComponents/group-modal/group-modal.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { IGroupBrokerService } from '../AppServices/AppWriteServices/GroupServices/IGroupBrokerService';
import { GroupBrokerService } from '../AppServices/AppWriteServices/GroupServices/group-broker-service.service';
import { UserGroupComponent } from './GroupComponents/user-group/user-group.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    NavbarComponent,
    FilesComponent,
    GenerateQuestionsAnsComponent,
    UsereventComponent,
    ContactContainerComponent,
    GroupTableCompComponent,
    GroupModalComponent,
    UserGroupComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    TableModule,
    DynamicDialogModule,
    FileUploadModule,
    DividerModule,
    SidebarModule,
    ToastModule
  ],
  providers: 
  [
      { provide: ICategoryBrokerService, useClass: CategoryBrokerService },
      { provide: IUserBrokerService, useClass: UserBrokerService },
      { provide: IStorageBrokerService, useClass: StorageBrokerService },
      { provide: IEventBrokerService, useClass: EventBrokerService },
      { provide: IContactService, useClass: ContactsService },
      { provide: IAddressService, useClass: AddressService },
      { provide: IGroupBrokerService, useClass: GroupBrokerService },
    
  ],
})
export class UserModule { }
