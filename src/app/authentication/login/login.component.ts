import { Component, OnInit } from '@angular/core';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from "appwrite";
import { AppWriteHttpClientService } from 'src/app/AppServices/app-write-http-client.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit
{
    
    loginFormGroup: FormGroup;
    appService:AppWriteHttpClientService;
    
    constructor(builder: FormBuilder,appService:AppWriteHttpClientService,private router:Router) {
      this.appService =appService;
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
    
    if(this.loginFormGroup.valid)
     {
        await this.loginAsync()
     }else
     {
        Object.keys(this.loginFormGroup.controls).forEach(field => {
          const control = this.loginFormGroup.get(field);
          control?.markAsTouched({ onlySelf: true });
         });
     }
  } 

    async loginAsync()
    {
      let client=this.appService.getClient();
      const account = new Account(client);
    
      var email = this.loginFormGroup.controls['email'].value;
      var password = this.loginFormGroup.controls['password'].value;
      const result = await account.createEmailSession(email, password);
  
      if(result.current)
      {
        await this.generateJwtTokenAsync();
        alert('logged in successfully');
         this.router.navigate(["user/files"]);
      }else{
        console.log(result);
      }
    }


    async generateJwtTokenAsync()
    {
      let client=this.appService.getClient();
      const account = new Account(client);
      const jwtToken = await account.createJWT();
      console.log('jwt token==' + jwtToken.jwt);
      localStorage.setItem('authToken',jwtToken.jwt)
    }
  
}

