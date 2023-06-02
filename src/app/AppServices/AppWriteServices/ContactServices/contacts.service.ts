import { Injectable } from '@angular/core';
import { IContactService } from './IContactService';
import { ContactsModel } from 'src/app/Models/ContactsModel';
import { Client, Databases, ID } from 'appwrite';
import { AppWriteHttpClientService } from '../../app-write-http-client.service';
import { IAddressService } from '../AddressServices/IAddressService';
import { AppResources } from '../../AppResources';
import { IUserBrokerService } from '../UserServices/IUseBrokerService';
import { AddressModel } from 'src/app/Models/AddressModel';

@Injectable({
  providedIn: 'root'
})
export class ContactsService implements IContactService {

  // contactModel :ContactsModel={
  //   RecordId: '',
  //   FirstName: '',
  //   LastName: '',
  //   Email: '',
  //   MobileNo: '',
  //   CreatedById: '',
  //   ContactAddress: {
  //     RecordId: '',
  //     Address1: '',
  //     Address2: '',
  //     Conuntry: '',
  //     State: '',
  //     City: '',
  //     Pincode: '',
  //     OwnerId: ''
  //   }
  // };
  appWriteDataBase : Databases ;
  appWriteClient :Client;
  
  constructor(private appWriteHttpService:AppWriteHttpClientService,
              private addressService:IAddressService,
              private userService:IUserBrokerService) 
  { 
    this.appWriteClient = appWriteHttpService.getClient();
    this.appWriteDataBase = new Databases(this.appWriteClient);
  }
  
  async createContactWithAddress(contactModel: ContactsModel): Promise<boolean> {
         
           let isCreated:boolean =false;
          //first save contact &&  gets it record id
           let contactRecordId = await this.saveContactAsync(contactModel);
           //save address with that record id
           if(contactRecordId)
           {
              
  
              let savedAddressId = await this.saveAddressAsync(contactModel.ContactAddress,contactRecordId);

              if(savedAddressId)
              {
                 isCreated =true;
              }else{
                //rolled back the created user

                isCreated =false;
              }

           }else{
              isCreated =false;
           }
         return isCreated; 
  }
  async getContactByRecordIdAsync(recordId: string): Promise<ContactsModel> {
    throw new Error('Method not implemented.');
  }
  async getContactListByOwnerIdAsync(ownerId: string): Promise<ContactsModel[]> {
    throw new Error('Method not implemented.');
  }
  async deleteContactByRecordIdAsync(recordId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }



  async saveContactAsync(contactModel:ContactsModel):Promise<string>
  {
    
    let contactRecordId:string ='';
    
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
        contactRecordId = result.$id;
        console.log('inserted successfully')
      }else{
        console.log('some error occurred');
      } 
    }catch(e)
    {
        console.log("Some excpetion occurred while saving contact ");
        throw e;
    }
    return contactRecordId; 
  
  }
  async saveAddressAsync(addessModel:AddressModel,contactRecordId:string):Promise<string>
  {
    
    let addressRecordId:string =''
    
    
    let appWriteAddressEntity = {
      addressline1:addessModel.Address1,
      addressline2:addessModel.Address2,
      country:addessModel.Country,
      state:addessModel.State,
      city:addessModel.City,
      pincode:addessModel.Pincode,
      owner_id:contactRecordId
    };
    
    try{
      let result =await this.appWriteDataBase.createDocument(AppResources.eventManagerDatabaseId, AppResources.addressCollectionId, ID.unique(), appWriteAddressEntity);
      if(result.$id)
      {
        addressRecordId = result.$id;
        console.log('inserted successfully')
      }else{
        console.log('some error occurred');
      }
    }catch(e)
    {
      console.log("Some excpetion occurred while saving address for contact" + addessModel.OwnerId);
      throw e;
    }
    return addressRecordId; 
  
  }
}
