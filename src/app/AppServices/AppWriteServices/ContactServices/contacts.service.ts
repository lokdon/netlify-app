import { Injectable } from '@angular/core';
import { IContactService } from './IContactService';
import { ContactsModel } from 'src/app/Models/ContactsModel';
import { Client, Databases, ID, Query } from 'appwrite';
import { AppWriteHttpClientService } from '../../app-write-http-client.service';
import { IAddressService } from '../AddressServices/IAddressService';
import { AppResources } from '../../AppResources';
import { IUserBrokerService } from '../UserServices/IUseBrokerService';
import { AddressModel } from 'src/app/Models/AddressModel';
import { PaginationSpecificationModel } from 'src/app/Models/QuerySpecificationModel';
import { GroupModel } from 'src/app/Models/GroupModel';
import { ApiResponseModel } from 'src/app/Models/ResultModel';

@Injectable({
  providedIn: 'root'
})
export class ContactsService implements IContactService {
  appWriteDataBase : Databases ;
  appWriteClient :Client;
  
  constructor(private appWriteHttpService:AppWriteHttpClientService,
              private addressService:IAddressService,
              private userService:IUserBrokerService) 
  { 
    this.appWriteClient = this.appWriteHttpService.getClient();
    this.appWriteDataBase = new Databases(this.appWriteClient);
  }
  
  async createContactWithAddress(contactModel: ContactsModel): Promise<ApiResponseModel<ContactsModel>> {
         
           let apiResponse:ApiResponseModel<ContactsModel>={
             IsValid: false,
             Errors: [],
             Success: {
               RecordId: '',
               FirstName: '',
               LastName: '',
               Email: '',
               MobileNo: '',
               CreatedById: '',
               ContactAddress: {
                 RecordId: '',
                 Address1: '',
                 Address2: '',
                 Country: '',
                 State: '',
                 City: '',
                 Pincode: '',
                 OwnerId: ''
               }
             },
             TotalRecordCount: 0
           }
    
           let isCreated:boolean =false;
          //first save contact &&  gets it record id
          var addedContactModel = await this.saveContactAsync(contactModel);
          
          if(addedContactModel.RecordId) {
            apiResponse.IsValid =true;
            apiResponse.Success = await this.saveContactAsync(contactModel);
          }else{
            apiResponse.IsValid =false;
          }
         
           //save address with that record id
           if(apiResponse.IsValid)
           {
              let savedAddressResponse = await this.addressService
                                                  .createAddressAsync(
                                                    contactModel.ContactAddress,
                                                    addedContactModel.RecordId);
              if(savedAddressResponse.IsValid)
              {
                 contactModel.ContactAddress.RecordId = savedAddressResponse.Success.RecordId;
                 contactModel.ContactAddress.Address1 = savedAddressResponse.Success.Address1;
                 contactModel.ContactAddress.Address2 = savedAddressResponse.Success.Address2;
                 contactModel.ContactAddress.Country = savedAddressResponse.Success.Country;
                 contactModel.ContactAddress.State = savedAddressResponse.Success.State;
                 contactModel.ContactAddress.City = savedAddressResponse.Success.City;
                 contactModel.ContactAddress.Pincode = savedAddressResponse.Success.Pincode;

              }else{
                //rolled back the created user
                apiResponse.IsValid =false;
                isCreated =false;
              }
           }
         return apiResponse; 
  }

  async getContactByRecordIdAsync(recordId: string): Promise<ApiResponseModel<ContactsModel>> {
    let apiResponse:ApiResponseModel<ContactsModel>={
      IsValid: false,
      Errors: [],
      Success: {
        RecordId: '',
        FirstName: '',
        LastName: '',
        Email: '',
        MobileNo: '',
        CreatedById: '',
        ContactAddress: {
          RecordId: '',
          Address1: '',
          Address2: '',
          Country: '',
          State: '',
          City: '',
          Pincode: '',
          OwnerId: ''
        }
      },
      TotalRecordCount: 0
    }
    
    try{
      const contact = await this.appWriteDataBase.getDocument(
        AppResources.eventManagerDatabaseId,
        AppResources.contactsCollectionId,
        recordId
      )


      if(contact.$id)
      {
        let model:ContactsModel={
          RecordId: contact.$id,
          FirstName: contact['first_name'],
          LastName: contact['last_name'],
          Email: contact['email'],
          MobileNo: contact['mobile_no'],
          CreatedById: contact['user_id'],
          ContactAddress: {
            RecordId: '',
            Address1: '',
            Address2: '',
            Country: '',
            State: '',
            City: '',
            Pincode: '',
            OwnerId: ''
          }
        }
        apiResponse.IsValid =true;
        apiResponse.Success =model;
      }
  
     
      } catch(e)
      {
        apiResponse.IsValid =false;
        console.log('some exception occurred while fetching group')
      }
          return apiResponse;
  }

  async getContactListByOwnerIdAsync(ownerId: string): Promise<ApiResponseModel<ContactsModel[]>> {
    throw new Error('Method not implemented.');
  }
  async deleteContactByRecordIdAsync(recordId: string): Promise<ApiResponseModel<boolean>> {
    throw new Error('Method not implemented.');
  }

  async getPaginatedContactListByUserIdAsync(userId:string,paginatedModel:PaginationSpecificationModel)
  :Promise<ApiResponseModel<ContactsModel[]>>
  {

    let apiResponseModel: ApiResponseModel<ContactsModel[]>={
      IsValid: false,
      Errors: [],
      Success:[] ,
      TotalRecordCount: 0
    }
                                    
  try{
          const groupDocuments = await this.appWriteDataBase.listDocuments(
            AppResources.eventManagerDatabaseId,
            AppResources.contactsCollectionId,
          [
              Query.equal("user_id", userId),
              Query.limit(paginatedModel.Limit),
              Query.offset(paginatedModel.Offset),
              Query.orderAsc('first_name')
          ]);

     
      if(groupDocuments.total >0)
      {
        let result = groupDocuments.documents.map((document)=>{ 
              let model:ContactsModel={
                RecordId: document.$id,
                FirstName: document['first_name'],
                LastName: document['last_name'],
                Email: document['email'],
                MobileNo: document['mobile_no'],
                CreatedById: document['user_id'],
                ContactAddress: {
                  RecordId: '',
                  Address1: '',
                  Address2: '',
                  Country: '',
                  State: '',
                  City: '',
                  Pincode: '',
                  OwnerId: ''
                }
              }
            return model;
        })
        apiResponseModel.IsValid =true;
        apiResponseModel.Success =result;
        apiResponseModel.TotalRecordCount=groupDocuments.total;

        console.log(groupDocuments.documents);
      }
  }
  catch(e)
  {
     apiResponseModel.IsValid =false;
     console.log('some exception occurred while fetching group')
  }
      return apiResponseModel;
  }



  async saveContactAsync(contactModel:ContactsModel):Promise<ContactsModel>
  {
    
    
    try{
      let createdById = await this.userService.getCurrentLoggedInUserIdAsync();
      
      let appwriteContactEntity={
        first_name:contactModel.FirstName,
        last_name:contactModel.LastName,
        email:contactModel.Email,
        mobile_no:contactModel.MobileNo,
        user_id:createdById,
      }
      
      let result =await this.appWriteDataBase.createDocument(AppResources.eventManagerDatabaseId, AppResources.contactsCollectionId, ID.unique(), appwriteContactEntity);
      if(result.$id)
      {
        contactModel.RecordId = result.$id;
      }
    }catch(e)
    {
        console.log("Some excpetion occurred while saving contact ");
        //throw e;
    }
    return contactModel; 
  
  }
  
}
