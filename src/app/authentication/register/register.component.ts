import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterValidationService } from './Services/register-validation.service';
import { AppWriteHttpClientService } from 'src/app/AppServices/app-write-http-client.service';
import { Account,Client,ID } from "appwrite";
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit{

  submitted:boolean = false;
  registerForm:FormGroup;
  appService:AppWriteHttpClientService
  
  constructor
  (
    private fb: FormBuilder,
    appService:AppWriteHttpClientService,
    private router:Router
  ) { 
     this.appService = appService;
    this.registerForm = this.fb.group({
      name:['', Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['', Validators.required]
  });
  }
  
  ngOnInit(): void {
     
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }
  
  async submitRegisterForm()
  {
     if(this.registerForm.valid)
     {
         await this.registerUserAsync();
       
     }else
     {
        Object.keys(this.registerForm.controls).forEach(field => {
          const control = this.registerForm.get(field);
          control?.markAsTouched({ onlySelf: true });
         });
     }
   
  }

  async registerUserAsync()
  {
    let client=this.appService.getClient();
    const account = new Account(client);
        
    var name = this.registerForm.controls['name'].value;
    var email = this.registerForm.controls['email'].value;
    var password = this.registerForm.controls['password'].value;
    
    const result =await account.create(ID.unique(), email, password,name);

    if(result.status)
    {
       this.router.navigate(["/auth/login"]);
    }else{
      console.log(result);
    }

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}

}
