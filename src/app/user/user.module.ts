import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FilesComponent } from './files/files.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainLayoutComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    NavbarComponent,
    FilesComponent,
    ChatBotComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
  ]
})
export class UserModule { }
