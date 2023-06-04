import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppWriteHttpClientService } from 'src/app/AppServices/app-write-http-client.service';
import { Account,Client,ID } from "appwrite";
import { Route, Router } from '@angular/router';
import { RegisterValidation } from 'src/app/Validations/RegisterValidation';
import { BaseValidation } from 'src/app/Validations/BaseValidation';
import { RegisterViewFormErrors } from 'src/app/Validations/FormErrors/RegisterViewFormErrors';
import { MessageService } from 'primeng/api';
import { IUSerAccountService } from 'src/app/AppServices/AppWriteServices/AccountServices/Login/IUserAccountService';
import { RegisterUserModel } from 'src/app/Models/AccountModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})


export class RegisterComponent implements OnInit{

  submitted:boolean = false;
  registerForm:FormGroup;
  appService:AppWriteHttpClientService

  registerFormErrors:RegisterViewFormErrors
  
  readonly requiredError:string="This Field is required"; 
  readonly inValidEmailError:string="Enter a valid email address"; 
  readonly invalidPassword:string="One Upper case one lower case and special required"
  
  constructor
  (
    private fb: FormBuilder,
    appService:AppWriteHttpClientService,
    registerFormErrors:RegisterViewFormErrors,
    private router:Router,
    private accountService:IUSerAccountService,
               
    public messageService:MessageService
  ) { 
     this.appService = appService;
    this.registerForm = this.fb.group({
      name:['', Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['', [Validators.required]] //
  });
    this.registerFormErrors = registerFormErrors;
  }
  
  ngOnInit(): void {
     
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }
  
  async submitRegisterForm()
  {
    this.submitted =true;
    if(this.registerForm.valid)
     {
      await this.registerUserAsync();
     }else
     {
      Object.keys(this.registerForm.controls).forEach(field => {
        const control = this.registerForm.get(field);
        control?.markAsTouched({ onlySelf: true });
       });

       this.submitted =false;
     }
   
  }

  async registerUserAsync()
  {
   
    let registerModel:RegisterUserModel={
      Name:this.registerForm.controls['name'].value,
      Email: this.registerForm.controls['email'].value,
      Password: this.registerForm.controls['password'].value
    }
     
    var result = await this.accountService.registerUserAsync(registerModel);

    if(result.IsValid)
    {
      //show notification registered successfully
      this.registerForm.reset();

    }else{
      //show notifiaction some error occurred;
      this.submitted =false;
      
      this.messageService.add({ severity: 'failed', summary: 'failed', detail: result.Errors[0].Value });
    }

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}





}
