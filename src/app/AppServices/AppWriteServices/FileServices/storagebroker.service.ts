import { Injectable, OnInit } from '@angular/core';
import { IStorageBrokerService } from './IStorageBrokerService';
import { Account, Client, Databases, ID, Models, Permission, Query,Role,Storage } from 'appwrite';
import { AppWriteHttpClientService } from '../../app-write-http-client.service';
import { AppResources } from '../../AppResources';
import { IUserBrokerService } from '../UserServices/IUseBrokerService';
import { UserFilesModel } from 'src/app/Models/UserFilesModel';

@Injectable({
  providedIn: 'root'
})
export class StorageBrokerService implements IStorageBrokerService,OnInit {

  appWriteDataBase : Databases ;
  appWriteClient :Client;
  userId:string='';
  appwriteStorage:Storage;

 
 
  constructor(private appWriteHttpService:AppWriteHttpClientService,
              private resources:AppResources,
              private userService:IUserBrokerService) 
  { 
    this.appWriteClient = appWriteHttpService.getClient();
    this.appWriteDataBase = new Databases(this.appWriteClient);
    this.appwriteStorage = new Storage(this.appWriteClient);
  }
  
  async getFileByFileIdAsync($fileId: string): Promise<Models.File> {
    var file = await this.appwriteStorage.getFile(AppResources.bucketId, $fileId);
    return file; 
  }
  
  async ngOnInit(): Promise<void> 
  {
       
  }
   
   
  async uploadUserFilesInBucketAsync(userId: string, bucketId: string, file:File): Promise<boolean> 
   {
        let addedFileId = await this.createNewFileAsync(bucketId,file);
        if(addedFileId)
        {
           var result = await this.addUserFilesToDatabseCollection(userId,addedFileId);
           if(result)
           {
             return true;
           }
        }                  
                                
        return false;
  }
   
  async  getAllFilesOfUserByUserId(userId: string): Promise<UserFilesModel[]> 
  {
    
    let userFilesArrayList: UserFilesModel[]=[];
    
    let result = await this.appWriteDataBase.listDocuments
                (
                    AppResources.questionDatabaseId,
                    AppResources.userFilesCollectionId,
                    [
                        Query.equal('userid', userId)
                    ]
                );
    
      if(result.total>0)
      {
          for(let m of result.documents)
          {
                let model:UserFilesModel={
                  UserId:'',
                  FileId:'',
                  $Id:''
                };

                model.$Id = m.$id;
                model.FileId = m['fileid'];
                model.UserId = m['userid'];
                userFilesArrayList.push(model);
          }
      }
      console.log(userFilesArrayList);

      return userFilesArrayList;
      
  }


  async createNewFileAsync(bucketId: string, file:File):Promise<string>
  {
       
        let addedFileIdByAppServer:string='';    
        try
        {
          var result= await this.appwriteStorage.createFile
          (
              bucketId,
              ID.unique(), //new file id inserted by client side
              file,
              [
                Permission.write(Role.users()),
                Permission.read(Role.users()),                  // Anyone can view this document
                Permission.update(Role.users()),      // Writers can update this document
                Permission.delete(Role.users()) // User 5c1f88b42259e can delete this document
            ]
              
          );
          addedFileIdByAppServer = result.$id; 
          console.log("added file by app server id==" + result.$id);  
        }
        catch(e)
        {
          console.log(e);
          throw e;
        }
        
        
        return addedFileIdByAppServer;
  }

  async addUserFilesToDatabseCollection(userId: string, fileId:string):Promise<boolean>
  {
    let model = {'userid': userId, 'fileid':fileId};                        
    //insert file id and user id in userfiles collection table df 
    try
    {
      let added =await  this.appWriteDataBase.createDocument(
        AppResources.questionDatabaseId, 
        AppResources.userFilesCollectionId, 
        ID.unique(), 
        model);
            
            if(added.$id)
            {
            console.log('inserted successfully with id==' + added.$id );
            return true;

            }else{
            console.log('some error occurred');
            }  
    }catch(e)
    {
       console.log(e);
       throw e;
    }
    return false;
  }
}
