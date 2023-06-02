import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppResources } from './AppServices/AppResources';
import { ICategoryBrokerService } from './AppServices/AppWriteServices/CategoryService/ICategoryBrokerService';
import { CategoryBrokerService } from './AppServices/AppWriteServices/CategoryService/category-broker.service';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    BrowserAnimationsModule
  ],
  providers: [AppResources],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
