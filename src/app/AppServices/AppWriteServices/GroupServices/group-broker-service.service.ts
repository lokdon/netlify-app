import { Injectable } from '@angular/core';
import { IGroupBrokerService } from './IGroupBrokerService';
import { GroupEntity, GroupModel } from 'src/app/Models/GroupModel';
import { Client, Databases, ID, Models, Query } from 'appwrite';
import { AppWriteHttpClientService } from '../../app-write-http-client.service';
import { IAddressService } from '../AddressServices/IAddressService';
import { IUserBrokerService } from '../UserServices/IUseBrokerService';
import { AppResources } from '../../AppResources';
import { ApiResponseModel } from 'src/app/Models/ResultModel';
import { PaginationSpecificationModel } from 'src/app/Models/QuerySpecificationModel';

@Injectable({
  providedIn: 'root'
})
export class GroupBrokerService implements IGroupBrokerService {

  appWriteDataBase : Databases ;
  appWriteClient :Client;
  
  constructor(private appWriteHttpService:AppWriteHttpClientService,
              private userService:IUserBrokerService) { 
    this.appWriteClient = appWriteHttpService.getClient();
    this.appWriteDataBase = new Databases(this.appWriteClient);
  }
  
  
  async createGroupForUserAsync(groupModel:GroupModel): Promise<ApiResponseModel<GroupModel>> {
     let apiResponseModel :ApiResponseModel<GroupModel>={
                                      IsValid: false,
                                      Errors: [],
                                      Success: groupModel,
                                      TotalRecordCount:0
                                  } 
    
      apiResponseModel= await this.createGroupAsync(groupModel,apiResponseModel);
       return apiResponseModel;
  }
  
  async getGroupByUserIdAsync(userId: string): Promise<ApiResponseModel<GroupModel>> {
    throw new Error('Method not implemented.');
  }
  
  async getGroupListByUserIdAsync(userId: string): Promise<ApiResponseModel<GroupModel[]>> {
    throw new Error('Method not implemented.');
  }

  async getPaginatedGroupListByUserIdAsync(userId: string, paginationModel:PaginationSpecificationModel): Promise<ApiResponseModel<GroupModel[]>> {
    let apiResponseModel :ApiResponseModel<GroupModel[]>={
      IsValid: false,
      Errors: [],
      Success: [],
      TotalRecordCount:0
  } 
   
  try{
          const groupDocuments = await this.appWriteDataBase.listDocuments(
            AppResources.eventManagerDatabaseId,
            AppResources.groupCollectionId,
          [
              Query.limit(paginationModel.Limit),
              Query.offset(paginationModel.Offset),
              Query.orderDesc('$createdAt')
          ]
      );


      if(groupDocuments.total >0)
      {
        let result = groupDocuments.documents.map((document)=>{ 
              let model:GroupModel={
                RecordId: document.$id,
                Name: document['name'],
                OwnerId: document['owner_id'],
                Count: document['count']
              }
            return model;
        })
        apiResponseModel.IsValid =true;
        apiResponseModel.Success =result;
        apiResponseModel.TotalRecordCount=groupDocuments.total;
      }
  }
  catch(e)
  {
     apiResponseModel.IsValid =false;
     console.log('some exception occurred while fetching group')
  }
  return apiResponseModel;
  }
  
  async getGroupByRecordIdAsync(recordId: string): Promise<ApiResponseModel<GroupModel>> {
    throw new Error('Method not implemented.');
  }
  async deleteGroupByRecordIdAsync(recordId: string): Promise<ApiResponseModel<boolean>> {
    throw new Error('Method not implemented.');
  }

  async createGroupAsync(groupModel:GroupModel,apiResponseModel:ApiResponseModel<GroupModel>):Promise<ApiResponseModel<GroupModel>>
  {
    
    try{
      let createdById = await this.userService.getCurrentLoggedInUserIdAsync();
      
      let groupEntity:GroupEntity={
        name: groupModel.Name,
        owner_id: createdById,
        count: groupModel.Count
      }
      
      let result =await this.appWriteDataBase.createDocument(
                        AppResources.eventManagerDatabaseId, 
                        AppResources.groupCollectionId, 
                        ID.unique(), 
                        groupEntity);
      
      
      if(result.$id)
      {
        groupModel.RecordId=result.$id;
        apiResponseModel.IsValid =true;
        apiResponseModel.Success = groupModel;
        console.log('inserted successfully')
      }else{
        apiResponseModel.IsValid =false;
        apiResponseModel.Errors.push({'Key':'error' ,'Value': 'error in saving the data'});
      } 
    }catch(e)
    {
      apiResponseModel.IsValid =false;
      apiResponseModel.Errors.push({'Key':'exception' ,'Value': 'excpetion occurred while saving group'});  
      console.log(e);
    }
    return apiResponseModel; 
  
  }
}
