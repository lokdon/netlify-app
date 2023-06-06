import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppResources } from './AppServices/AppResources';
import { ICategoryBrokerService } from './AppServices/AppWriteServices/CategoryService/ICategoryBrokerService';
import { CategoryBrokerService } from './AppServices/AppWriteServices/CategoryService/category-broker.service';
import { SidebarModule } from 'primeng/sidebar';
import { ProgressBarModule } from 'primeng/progressbar';
import { AuthenticationModule } from './Views/Modules/authentication/authentication.module';
import { UserModule } from './Views/Modules/user/user.module';
import { BaseValidation } from './Validations/BaseValidation';
import { RegisterValidation } from './Validations/RegisterValidation';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    BrowserAnimationsModule,
    ProgressBarModule,
    TableModule,
    StyleClassModule,
  ],
  providers: [AppResources, RegisterValidation],

  bootstrap: [AppComponent],
})
export class AppModule {}
