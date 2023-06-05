import { Injectable } from '@angular/core';
import { IAddressService } from './IAddressService';
import { AddressModel } from 'src/app/Models/AddressModel';
import { Client, Databases, ID } from 'appwrite';
import { AppWriteHttpClientService } from '../../app-write-http-client.service';
import { AppResources } from '../../AppResources';
import { ApiResponseModel } from 'src/app/Models/ResultModel';

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
  
  async createAddressAsync(addressModel: AddressModel,ownerId:string): Promise<ApiResponseModel<AddressModel>> {
       let apiResponse:ApiResponseModel<AddressModel>={
         IsValid: false,
         Errors: [],
         Success: {
           RecordId: '',
           Address1: '',
           Address2: '',
           Country: '',
           State: '',
           City: '',
           Pincode: '',
           OwnerId: ''
         },
         TotalRecordCount: 0
       }    
    
      try{
        
        let appWriteAddressEntity = {
          addressline1:addressModel.Address1,
          addressline2:addressModel.Address2,
          country:addressModel.Country,
          state:addressModel.State,
          city:addressModel.City,
          pincode:addressModel.Pincode,
          owner_id:ownerId
        };
        
        
        let result =await  this.appWriteDataBase
                          .createDocument(AppResources.eventManagerDatabaseId, 
                            AppResources.addressCollectionId, 
                            ID.unique(), appWriteAddressEntity);
        if(result.$id)
        {
          
          addressModel.RecordId = result.$id
          apiResponse.IsValid=true;
          apiResponse.Success = addressModel;

        }
      }
      catch(e){
          apiResponse.IsValid=false;
          apiResponse.Errors.push({Key:'address', Value:'Some excpetion occurred while saving address'});
      }
      return apiResponse;
  }
  
  
  async getAddressByRecordIdAsync(recordId: string): Promise<ApiResponseModel<AddressModel>> {
    throw new Error('Method not implemented.');
  }
  
  
  async getAddressByOwnerIdAsync(ownerId: string): Promise<ApiResponseModel<AddressModel>> {
    throw new Error('Method not implemented.');
  }
}
