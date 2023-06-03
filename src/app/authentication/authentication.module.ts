import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NonauthlayoutComponent } from './layout/nonauthlayout/nonauthlayout.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { IUSerAccountService } from '../AppServices/AppWriteServices/AccountServices/Login/IUserAccountService';
import { UserAccountService } from '../AppServices/AppWriteServices/AccountServices/Login/useraccount.service';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NonauthlayoutComponent,
    
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressBarModule,
    ToastModule,
    
  ],

  providers: 
  [
      { provide: IUSerAccountService, useClass: UserAccountService },
      
    
  ],
})
export class AuthenticationModule { }
