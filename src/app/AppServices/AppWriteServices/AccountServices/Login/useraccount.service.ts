import { Injectable } from '@angular/core';
import { IUSerAccountService } from './IUserAccountService';
import { LoginModel, LoginResponseModel, RegisterUserModel } from 'src/app/Models/AccountModel';
import { ApiResponseModel } from 'src/app/Models/ResultModel';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppWriteHttpClientService } from 'src/app/AppServices/app-write-http-client.service';
import { Account, AppwriteException, Client, ID, Models } from 'appwrite';


@Injectable({
  providedIn: 'root'
})
export class UserAccountService implements IUSerAccountService {

    appService:AppWriteHttpClientService;
    client:Client
    account:Account;
    
    submitDisabled:boolean = false;
    
    constructor(
                appService:AppWriteHttpClientService,
              ) {
      this.appService =appService;
       this.client=this.appService.getClient();
        this.account = new Account(this.client);

        
    }
  async registerUserAsync(model:RegisterUserModel): Promise<ApiResponseModel<boolean>> {
    let apiResponse: ApiResponseModel<boolean>={
      IsValid: false,
      Errors: [],
      Success:false,
      TotalRecordCount: 0
    }
    
    try{
      const result =await this.account.create(ID.unique(), model.Email, model.Password,model.Name);
      if(result.$id)
      {
         apiResponse.IsValid=true;
         apiResponse.Success=true;
      }
    }catch(e:any){
      apiResponse.IsValid =false;
      apiResponse.Success=false;  

      apiResponse.Errors.push({Key:e.type, Value:e.message });
      //console.log(e.message);
      //console.log(e.code);
       // throw e;
    }
   

    return apiResponse;
  }
  
    async generateJwtTokenAsync(): Promise<Models.Jwt> {
    const jwtToken = await this.account.createJWT();
    localStorage.setItem('authToken',jwtToken.jwt);
    return jwtToken;
  }
  
  async loginUserAsync(loginModel:LoginModel): Promise<ApiResponseModel<LoginResponseModel>> {
    let apiResponse: ApiResponseModel<LoginResponseModel>={
      IsValid: false,
      Errors: [],
      Success: {
        RecordId: '',
        UserId: ''
      },
      TotalRecordCount: 0
    }
   
    try{
      const result = await this.account.createEmailSession(loginModel.Email,loginModel.Password);
      if(result.$id)
      {
        apiResponse.IsValid =true;
        apiResponse.Success = {RecordId:result.$id, UserId:result.userId }
      }
    }
    catch(e:any)
    {
      apiResponse.IsValid =false;
      apiResponse.Errors = [{Key:'exception', Value:e.message}]
      console.log(e);
    }
    return apiResponse;
  }
  
  
  async logOutUserAsync(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
