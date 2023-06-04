import { Injectable, OnInit } from '@angular/core';
import { AppWriteHttpClientService } from '../../app-write-http-client.service';
import { Databases,Client, ID } from "appwrite";
import { ICategoryBrokerService } from './ICategoryBrokerService';

import { AppResources } from '../../AppResources';
import { CategoryModel } from 'src/app/Models/CategoryModel';


@Injectable({
  providedIn: 'root'
})
export class CategoryBrokerService implements OnInit , ICategoryBrokerService{

  appWriteDataBase : Databases ;
  appWriteClient :Client;

  constructor(private appWriteHttpService:AppWriteHttpClientService,private resources:AppResources) { 
    this.appWriteClient = appWriteHttpService.getClient();
    this.appWriteDataBase =   new Databases(this.appWriteClient);
  }
  
  
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  async createCategoryDocuments() :Promise<void>
  { 
    var objectToInsert ={Name:'demo',user_id:'abc1'};
    
    
    let result =await  this.appWriteDataBase.createDocument(AppResources.questionDatabaseId, AppResources.categoryCollectionId, ID.unique(), objectToInsert);
     if(result.$id)
     {
        console.log('inserted successfully')

    }else{
      console.log('some error occurred');
    }
  }

  async getAllCategoriesAsync():Promise<CategoryModel[]>
  {
    
    let categoryList :CategoryModel[] = []; 
    
    let result =await  this.appWriteDataBase.listDocuments(AppResources.questionDatabaseId, AppResources.categoryCollectionId);
     if(result.total>0)
     {
      
      for(let i =0; i<result.total;i++)
         {
            let model:CategoryModel={
                Name:'',
                UserId:''
            };

            model.Name = result.documents[i]['Name'];
            model.UserId = result.documents[i]['user_id'];

            categoryList.push(model);
         }
     
         console.log(categoryList)
    }else{
      console.log('no data in database');
    }

    return categoryList;
  }
   
  
}
