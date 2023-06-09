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

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';

import { SidebarModule } from 'primeng/sidebar';
import { UsereventComponent } from './EventComponent/userevent/userevent.component';

import { AddContactModalComponent } from './ContactComponents/add-contact-modal/add-contact-modal.component';
import { ContactContainerComponent } from './ContactComponents/contact-container/contact-container.component';

import { GroupTableCompComponent } from './GroupComponents/group-table-comp/group-table-comp.component';
import { GroupModalComponent } from './GroupComponents/group-modal/group-modal.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';

import { UserGroupComponent } from './GroupComponents/user-group/user-group.component';
import { IAddressService } from 'src/app/AppServices/AppWriteServices/AddressServices/IAddressService';
import { AddressService } from 'src/app/AppServices/AppWriteServices/AddressServices/address.service';
import { IContactService } from 'src/app/AppServices/AppWriteServices/ContactServices/IContactService';
import { ContactsService } from 'src/app/AppServices/AppWriteServices/ContactServices/contacts.service';
import { IEventBrokerService } from 'src/app/AppServices/AppWriteServices/EventServices/IEventBrokerService';
import { EventBrokerService } from 'src/app/AppServices/AppWriteServices/EventServices/event-broker-service.service';
import { IStorageBrokerService } from 'src/app/AppServices/AppWriteServices/FileServices/IStorageBrokerService';
import { StorageBrokerService } from 'src/app/AppServices/AppWriteServices/FileServices/storagebroker.service';
import { IGroupBrokerService } from 'src/app/AppServices/AppWriteServices/GroupServices/IGroupBrokerService';
import { GroupBrokerService } from 'src/app/AppServices/AppWriteServices/GroupServices/group-broker-service.service';
import { IUserBrokerService } from 'src/app/AppServices/AppWriteServices/UserServices/IUseBrokerService';
import { UserBrokerService } from 'src/app/AppServices/AppWriteServices/UserServices/user-broker.service';
import { ICategoryBrokerService } from 'src/app/AppServices/AppWriteServices/CategoryService/ICategoryBrokerService';
import { CategoryBrokerService } from 'src/app/AppServices/AppWriteServices/CategoryService/category-broker.service';
import { EventInboxComponent } from './EventComponent/event-inbox/event-inbox.component';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { MyEventTabViewContainerComponent } from './EventComponent/MyEvents/my-event-tab-view-container/my-event-tab-view-container.component';
import { MyAllEventTabPanelComponent } from './EventComponent/MyEvents/my-all-event-tab-panel/my-all-event-tab-panel.component';
import { MyEventSentTabViewComponent } from './EventComponent/MyEvents/my-event-sent-tab-view/my-event-sent-tab-view.component';
import { MyEventReplyTabViewComponent } from './EventComponent/MyEvents/my-event-reply-tab-view/my-event-reply-tab-view.component';
import { EventmodalComponent } from './EventComponent/MyEvents/eventmodal/eventmodal.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { IEventStatusBrokerService } from 'src/app/AppServices/AppWriteServices/EventServices/EventStatusService/IEventStatusBrokerService';
import { EventStatusBrokerService } from 'src/app/AppServices/AppWriteServices/EventServices/EventStatusService/eventstatusbroker.service';
import { EventMenuComponent } from './EventComponent/event-menu/event-menu.component';
import { MenuModule } from 'primeng/menu';

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
    AddContactModalComponent,
    EventInboxComponent,
    MyEventTabViewContainerComponent,
    MyAllEventTabPanelComponent,
    MyEventSentTabViewComponent,
    MyEventReplyTabViewComponent,
    EventmodalComponent,
    EventMenuComponent,
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
    ToastModule,
    TabViewModule,
    CardModule,
    InputNumberModule,
    MenuModule,
  ],
  providers: [
    { provide: ICategoryBrokerService, useClass: CategoryBrokerService },
    { provide: IUserBrokerService, useClass: UserBrokerService },
    { provide: IStorageBrokerService, useClass: StorageBrokerService },
    { provide: IEventBrokerService, useClass: EventBrokerService },
    { provide: IContactService, useClass: ContactsService },
    { provide: IAddressService, useClass: AddressService },
    { provide: IGroupBrokerService, useClass: GroupBrokerService },
    { provide: IEventStatusBrokerService, useClass: EventStatusBrokerService },
  ],
})
export class UserModule {}
