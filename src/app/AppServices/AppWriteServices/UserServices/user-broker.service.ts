import { Injectable } from '@angular/core';
import { IUserBrokerService } from './IUseBrokerService';
import { Account, Client, Databases, Models } from 'appwrite';
import { AppWriteHttpClientService } from '../../app-write-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserBrokerService implements IUserBrokerService {

  appWriteClient :Client;
  userAccount:Account;
  constructor(private appWriteHttpService:AppWriteHttpClientService) { 
    this.appWriteClient = appWriteHttpService.getClient();
    this.userAccount = new Account(this.appWriteClient);
  }
  
  async getCurrentLoggedInUserAccountAsync(): Promise<Models.Preferences | void> {
    try{
      const currentUser = await this.userAccount.get();
      if(currentUser.$id)
      {
         return currentUser;
      }
    }catch(e)
    {
         console.log(e);
    }
    return Promise<void>;
  }
  
  async getCurrentLoggedInUserIdAsync():Promise<string>
  {
    
    try{
      const currentUser = await this.userAccount.get();
      if(currentUser.$id)
      {
         return currentUser.$id;
      }
    }catch(e)
    {
         console.log(e);
    }
    return '';
  }
}
