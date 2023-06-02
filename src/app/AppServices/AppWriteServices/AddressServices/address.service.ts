import { Injectable } from '@angular/core';
import { IAddressService } from './IAddressService';
import { AddressModel } from 'src/app/Models/AddressModel';
import { Client, Databases, ID } from 'appwrite';
import { AppWriteHttpClientService } from '../../app-write-http-client.service';
import { AppResources } from '../../AppResources';

@Injectable({
  providedIn: 'root'
})
export class AddressService implements IAddressService{

  appWriteDataBase : Databases ;
  appWriteClient :Client;
  
  constructor(private appWriteHttpService:AppWriteHttpClientService){ 
    this.appWriteClient = appWriteHttpService.getClient();
    this.appWriteDataBase = new Databases(this.appWriteClient);
  }
  
  async createAddressAsync(addressModel: AddressModel): Promise<boolean> {
        let result =await  this.appWriteDataBase.createDocument(AppResources.eventManagerDatabaseId, AppResources.addressCollectionId, ID.unique(), addressModel);
        if(result.$id)
        {
          console.log('inserted successfully')
          return true;

      }else{
        console.log('some error occurred');
      }

      return false;
  }
  
  
  async getAddressByRecordIdAsync(recordId: string): Promise<AddressModel> {
    throw new Error('Method not implemented.');
  }
  
  
  async getAddressByOwnerIdAsync(ownerId: string): Promise<AddressModel> {
    throw new Error('Method not implemented.');
  }
}
