import { Component, OnInit } from '@angular/core';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from "appwrite";
import { MessageService } from 'primeng/api';
import { IUSerAccountService } from 'src/app/AppServices/AppWriteServices/AccountServices/Login/IUserAccountService';
import { AppWriteHttpClientService } from 'src/app/AppServices/app-write-http-client.service';
import { LoginModel } from 'src/app/Models/AccountModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})

export class LoginComponent implements OnInit
{
    
    loginFormGroup: FormGroup;
    

    submitDisabled:boolean = false;
    
    constructor(builder: FormBuilder,
                private accountService:IUSerAccountService,
                private router:Router,
                public messageService:MessageService) {
      this.loginFormGroup = builder.group({
        email: ['',[Validators.required, Validators.email]],
        password: ['',Validators.required]
      });
    }
  
  
  ngOnInit(): void {
      if(localStorage.getItem('authToken')!=null)
      {
        this.router.navigate(['user/files'])
      }
  }

   
    get loginFormControl()
    {
      return this.loginFormGroup.controls;
    }

 async submitLoginForm()
  {
    this.submitDisabled =true;
    if(this.loginFormGroup.valid)
     {
        await this.loginAsync()
     }else
     {
        Object.keys(this.loginFormGroup.controls).forEach(field => {
          const control = this.loginFormGroup.get(field);
          control?.markAsTouched({ onlySelf: true });
         });

         this.submitDisabled =false;
     }
  } 

    async loginAsync()
    {
      let loginModel:LoginModel={
        Email: '',
        Password: ''
      }
    
      loginModel.Email= this.loginFormGroup.controls['email'].value;
      loginModel.Password = this.loginFormGroup.controls['password'].value;
       
      var result = await this.accountService.loginUserAsync(loginModel);

      if(result.IsValid)
      {
        await this.accountService.generateJwtTokenAsync();
        this.router.navigate(['user/files']);

      }else{
        //show notifiaction some error occurred;
        this.submitDisabled =false;
        this.messageService.add({ severity: 'failed', summary: 'failed', detail: 'Invalid user Id Password' });
      }
      
    }


  
}

