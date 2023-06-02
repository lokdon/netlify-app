import { Injectable } from '@angular/core';
import { IEventBrokerService } from './IEventBrokerService';
import { Client, Databases, ID } from 'appwrite';
import { AppWriteHttpClientService } from '../../app-write-http-client.service';
import { AppResources } from '../../AppResources';
import { EventModel, EventModelMVVM, SubEventModel } from 'src/app/Models/EventModel';

@Injectable({
  providedIn: 'root'
})
export class EventBrokerService implements IEventBrokerService{

  appWriteDataBase : Databases ;
  appWriteClient :Client;
  userId:string='';
  

 
 
  constructor(private appWriteHttpService:AppWriteHttpClientService) 
  { 
    this.appWriteClient = appWriteHttpService.getClient();
    this.appWriteDataBase = new Databases(this.appWriteClient);
  }
  
  getEventWithStatusHistoryByUserIdAndEventIdAsync(userId: string, eventId: string): EventModelMVVM[] 
  {
    return this.seedEventData();
  }
   
  
  
  async createUserEventAsync(userEvent: EventModel): Promise<boolean> 
  {
    
    let result =await  this.appWriteDataBase.createDocument(AppResources.eventManagerDatabaseId, AppResources.eventCollectionId, ID.unique(), userEvent);
     
    if(result.$id)
     {
        console.log('event inserted successfully')
        return true;

    }else{
      console.log('some error occurred');
    }

    return false;
  }
  async  getUserEventByUserIdAndEventIdAsync(userId: string, eventId: string, eventStatus: number): Promise<EventModel> {
    throw new Error('Method not implemented.');
  }
 async  getListofUserEventByUserIdAndEventIdAsync(userId: string, eventId: string, eventStatus: number): Promise<EventModel[]> {
    throw new Error('Method not implemented.');
  }


  seedEventData():EventModelMVVM[]
  {
     let requiredList :EventModelMVVM[] =[];

     let parentEvent1: EventModel={
      $Id:'1',
      Name:'demo1',
      EventDate:new Date(),
      SubmissionDate:new Date(),
      EventStatus:1,
      UserId:'1',
      OwnerId:'1',
      IsOwned:true,
      NoOfGuest:2
     }

     let parentEvent2: EventModel={
      $Id:'2',
      Name:'demo2',
      EventDate:new Date(),
      SubmissionDate:new Date(),
      EventStatus:0,
      UserId:'2',
      OwnerId:'2',
      IsOwned:true,
      NoOfGuest:2
     } 

     let parentEvent3: EventModel={
      $Id:'3',
      Name:'demo3',
      EventDate:new Date(),
      SubmissionDate:new Date(),
      EventStatus:1,
      UserId:'3',
      OwnerId:'3',
      IsOwned:true,
      NoOfGuest:2
     } 


     let subParentEvent1_1: SubEventModel={
      $Id:'s1',
      Name:'demo1',
      EventDate:new Date(),
      SubmissionDate:new Date(),
      EventStatus:1,
      ParentEventId:'1'
     } 


     let subParentEvent1_2: SubEventModel={
      $Id:'s2',
      Name:'demo1',
      EventDate:new Date(),
      SubmissionDate:new Date(),
      EventStatus:1,
      ParentEventId:'1'
     } 

     let subParentEvent2_1: SubEventModel={
      $Id:'s3',
      Name:'demo1',
      EventDate:new Date(),
      SubmissionDate:new Date(),
      EventStatus:1,
      ParentEventId:'2'
     } 


     let subParentEvent2_2: SubEventModel={
      $Id:'s4',
      Name:'demo1',
      EventDate:new Date(),
      SubmissionDate:new Date(),
      EventStatus:1,
      ParentEventId:'2'
     } 

     let subParentEvent3_1: SubEventModel={
      $Id:'s5',
      Name:'demo1',
      EventDate:new Date(),
      SubmissionDate:new Date(),
      EventStatus:1,
      ParentEventId:'3'
     } 


     let subParentEvent3_2: SubEventModel={
      $Id:'s6',
      Name:'demo1',
      EventDate:new Date(),
      SubmissionDate:new Date(),
      EventStatus:1,
      ParentEventId:'3'
     } 


     let eventMvvm1: EventModelMVVM=
     {
      ParentEvent : parentEvent1,
      EventStatusHistory:[subParentEvent1_1,subParentEvent1_2]
     }

     let eventMvvm2: EventModelMVVM=
     {
      ParentEvent : parentEvent2,
      EventStatusHistory:[subParentEvent2_1,subParentEvent2_2]
     }

     let eventMvvm3: EventModelMVVM=
     {
      ParentEvent : parentEvent3,
      EventStatusHistory:[subParentEvent3_1,subParentEvent3_2]
     }

     requiredList.push(eventMvvm1);
     requiredList.push(eventMvvm2);
     requiredList.push(eventMvvm3);

     return requiredList;
  }
}
