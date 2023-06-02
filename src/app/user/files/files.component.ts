
import { Component, OnInit,Input } from '@angular/core';
import { Client, Databases } from 'appwrite';
import { AppResources } from 'src/app/AppServices/AppResources';
import { ICategoryBrokerService } from 'src/app/AppServices/AppWriteServices/CategoryService/ICategoryBrokerService';
import { CategoryBrokerService } from 'src/app/AppServices/AppWriteServices/CategoryService/category-broker.service';
import { IStorageBrokerService } from 'src/app/AppServices/AppWriteServices/FileServices/IStorageBrokerService';
import { IUserBrokerService } from 'src/app/AppServices/AppWriteServices/UserServices/IUseBrokerService';
import { AppWriteHttpClientService } from 'src/app/AppServices/app-write-http-client.service';
import { CategoryModel } from 'src/app/Models/CategoryModel';
import { UserFilesModel } from 'src/app/Models/UserFilesModel';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
 
})
export class FilesComponent implements OnInit {
  
  userFileViewModel :UserFilesViewModel[]=[];
  appWriteDataBase : Databases ;
  appWriteClient :Client;
  userId:string=''
  uploadedFiles: any[] = [];
  
  constructor(
              private appWriteHttpService:AppWriteHttpClientService,
              private resources:AppResources,
              private userService:IUserBrokerService,
              private storageService:IStorageBrokerService) 
  { 
    this.appWriteClient = appWriteHttpService.getClient();
    this.appWriteDataBase = new Databases(this.appWriteClient);
  }
  
  
  
  async ngOnInit(): Promise<void> {
    
    //retrieve currently logged in user
    await this.getLoggedInUserIdAsync()
    // this.categoryService.createCategoryDocuments();
   
    this.initViewDataAsync();
    
  }

  async initViewDataAsync()
  {
    //get all filesId of user   
    var result = await this.storageService.getAllFilesOfUserByUserId(this.userId);
    
    for (const model of result) {
           let tempModel:UserFilesViewModel={
                  UserId:'',
                  FileId:'',
                  FileName:''
           } ;

           let retrievedFileFromFileId = await this.storageService.getFileByFileIdAsync(model.FileId);
           if(retrievedFileFromFileId.$id)
           {
              tempModel.FileId = model.FileId;
              tempModel.FileName = retrievedFileFromFileId.name;
              tempModel.UserId = model.UserId;
           }
           this.userFileViewModel.push(tempModel);
      }
  }
  
  async getLoggedInUserIdAsync()
  {
    this.userId = await this.userService.getCurrentLoggedInUserIdAsync();
    if(this.userId === null || this.userId.trim() === "")
    {
      alert ('problem in retrieving current user ID');
    }
  }

  async fileUploadHandler(event:any,fileUpload:any) 
  {
      var result = await this
                          .storageService
                          .uploadUserFilesInBucketAsync
                          (this.userId,AppResources.bucketId,event.files[0]);
      if(result)
      {
        alert('file uploaded successfully');
      }else{
        alert('some error occurred');
      }
      fileUpload.clear(); // this will clear your file
       this.userFileViewModel =[];
      await this.initViewDataAsync();
  }

}


export interface UserFilesViewModel{
     UserId:string;
     FileId:string;
     FileName:string;
}



