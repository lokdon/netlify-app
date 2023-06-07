import { Injectable, ViewChild } from '@angular/core';
import { IEventBrokerService } from './IEventBrokerService';
import { Client, Databases, ID, Models, Query } from 'appwrite';
import { AppWriteHttpClientService } from '../../app-write-http-client.service';
import { AppResources } from '../../AppResources';
import {
  EventEntity,
  EventModel,
  EventModelMVVM,
  SubEventModel,
} from 'src/app/Models/EventModel';
import { ApiResponseModel } from 'src/app/Models/ResultModel';
import { PaginationSpecificationModel } from 'src/app/Models/QuerySpecificationModel';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { ContactsModel } from 'src/app/Models/ContactsModel';

@Injectable({
  providedIn: 'root',
})
export class EventBrokerService implements IEventBrokerService {
  appWriteDataBase: Databases;
  appWriteClient: Client;
  userId: string = '';

  constructor(private appWriteHttpService: AppWriteHttpClientService) {
    this.appWriteClient = appWriteHttpService.getClient();
    this.appWriteDataBase = new Databases(this.appWriteClient);
  }

  getEventWithStatusHistoryByUserIdAndEventIdAsync(
    userId: string,
    eventId: string
  ): Promise<ApiResponseModel<EventModel[]>> {
    throw new Error('Method not implemented.');
  }

  async createUserEventAsync(
    userEvent: EventModel
  ): Promise<ApiResponseModel<EventModel>> {
    let apiResponse = this.createApiResponseModelForEvent();
    let appWriteEventEntity = this.mapEventEntityFromEventModal(userEvent);
    console.log(appWriteEventEntity);

    try {
      let result = await this.appWriteDataBase.createDocument(
        AppResources.eventManagerDatabaseId,
        AppResources.eventCollectionId,
        ID.unique(),
        appWriteEventEntity
      );

      if (result.$id) {
        userEvent.RecordId = result.$id;
        apiResponse.IsValid = true;
        apiResponse.Success = userEvent;
      }
    } catch (e) {
      apiResponse.IsValid = false;
      apiResponse.Errors.push({
        Key: 'userevent_saving_error',
        Value: 'Some exception occurred whie saving event',
      });
    }

    return apiResponse;
  }

  async getAllEventsByUserIdByPaginatedModelAsync(
    userId: string,
    paginatedModel: PaginationSpecificationModel
  ): Promise<ApiResponseModel<EventModel[]>> {
    let apiResponseModel = this.createApiResponseModelForEventList();

    try {
      const eventDocuments = await this.appWriteDataBase.listDocuments(
        AppResources.eventManagerDatabaseId,
        AppResources.eventCollectionId,
        [
          Query.equal('owner_id', userId),
          Query.limit(paginatedModel.Limit),
          Query.offset(paginatedModel.Offset),
          Query.orderDesc('$createdAt'),
        ]
      );

      if (eventDocuments.total > 0) {
        console.log(eventDocuments.documents);
        let result = eventDocuments.documents.map((document) => {
          return this.mapEventModelFromAppWriteEventDocument(document);
        });
        apiResponseModel.IsValid = true;
        apiResponseModel.Success = result;
        apiResponseModel.TotalRecordCount = eventDocuments.total;
      }
    } catch (e) {
      apiResponseModel.IsValid = false;
      console.log('some exception occurred while fetching group');
    }

    return apiResponseModel;
  }
  async getUserEventByUserIdAndEventIdAsync(
    userId: string,
    eventId: string,
    eventStatus: number
  ): Promise<ApiResponseModel<EventModel>> {
    throw new Error('Method not implemented.');
  }
  async getListofUserEventByUserIdAndEventIdAsync(
    userId: string,
    eventId: string,
    eventStatus: number
  ): Promise<ApiResponseModel<EventModel[]>> {
    throw new Error('Method not implemented.');
  }

  seedEventData(): EventModelMVVM[] {
    let requiredList: EventModelMVVM[] = [];

    //  let parentEvent1: EventModel={
    //   $Id:'1',
    //   Name:'demo1',
    //   EventDate:new Date(),
    //   SubmissionDate:new Date(),
    //   EventStatus:1,

    //   OwnerId:'1',

    //   NoOfGuest:2
    //  }

    //  let parentEvent2: EventModel={
    //   $Id:'2',
    //   Name:'demo2',
    //   EventDate:new Date(),
    //   SubmissionDate:new Date(),
    //   EventStatus:0,
    //   UserId:'2',
    //   OwnerId:'2',
    //   IsOwned:true,
    //   NoOfGuest:2
    //  }

    //  let parentEvent3: EventModel={
    //   $Id:'3',
    //   Name:'demo3',
    //   EventDate:new Date(),
    //   SubmissionDate:new Date(),
    //   EventStatus:1,
    //   UserId:'3',
    //   OwnerId:'3',
    //   IsOwned:true,
    //   NoOfGuest:2
    //  }

    //  let subParentEvent1_1: SubEventModel={
    //   $Id:'s1',
    //   Name:'demo1',
    //   EventDate:new Date(),
    //   SubmissionDate:new Date(),
    //   EventStatus:1,
    //   ParentEventId:'1'
    //  }

    //  let subParentEvent1_2: SubEventModel={
    //   $Id:'s2',
    //   Name:'demo1',
    //   EventDate:new Date(),
    //   SubmissionDate:new Date(),
    //   EventStatus:1,
    //   ParentEventId:'1'
    //  }

    //  let subParentEvent2_1: SubEventModel={
    //   $Id:'s3',
    //   Name:'demo1',
    //   EventDate:new Date(),
    //   SubmissionDate:new Date(),
    //   EventStatus:1,
    //   ParentEventId:'2'
    //  }

    //  let subParentEvent2_2: SubEventModel={
    //   $Id:'s4',
    //   Name:'demo1',
    //   EventDate:new Date(),
    //   SubmissionDate:new Date(),
    //   EventStatus:1,
    //   ParentEventId:'2'
    //  }

    //  let subParentEvent3_1: SubEventModel={
    //   $Id:'s5',
    //   Name:'demo1',
    //   EventDate:new Date(),
    //   SubmissionDate:new Date(),
    //   EventStatus:1,
    //   ParentEventId:'3'
    //  }

    //  let subParentEvent3_2: SubEventModel={
    //   $Id:'s6',
    //   Name:'demo1',
    //   EventDate:new Date(),
    //   SubmissionDate:new Date(),
    //   EventStatus:1,
    //   ParentEventId:'3'
    //  }

    //  let eventMvvm1: EventModelMVVM=
    //  {
    //   ParentEvent : parentEvent1,
    //   EventStatusHistory:[subParentEvent1_1,subParentEvent1_2]
    //  }

    //  let eventMvvm2: EventModelMVVM=
    //  {
    //   ParentEvent : parentEvent2,
    //   EventStatusHistory:[subParentEvent2_1,subParentEvent2_2]
    //  }

    //  let eventMvvm3: EventModelMVVM=
    //  {
    //   ParentEvent : parentEvent3,
    //   EventStatusHistory:[subParentEvent3_1,subParentEvent3_2]
    //  }

    //  requiredList.push(eventMvvm1);
    //  requiredList.push(eventMvvm2);
    //  requiredList.push(eventMvvm3);

    return requiredList;
  }

  createApiResponseModelForEvent(): ApiResponseModel<EventModel> {
    let apiResponse: ApiResponseModel<EventModel> = {
      IsValid: false,
      Errors: [],
      Success: {
        RecordId: '',
        Name: '',
        EventStartDate: '',
        EventStartTime: '',
        EventEndDate: '',
        EventEndTime: '',
        OwnerId: '',
        NoOfGuest: 0,
      },
      TotalRecordCount: 0,
    };

    return apiResponse;
  }

  createApiResponseModelForEventList(): ApiResponseModel<EventModel[]> {
    let apiResponse: ApiResponseModel<EventModel[]> = {
      IsValid: true,
      Errors: [],
      Success: [],
      TotalRecordCount: 0,
    };

    return apiResponse;
  }

  convertStringDateTimeToDateTimeObject(date: string, time: string): Date {
    var dateParts = date.split('/');
    var timeParts = time.split(':');
    console.log(dateParts);
    var dateObject = new Date(
      +dateParts[2],
      +dateParts[1] - 1,
      +dateParts[0],
      +timeParts[0],
      +timeParts[1]
    );
    console.log(dateObject);
    return dateObject;
  }

  mapEventEntityFromEventModal(userEvent: EventModel): EventEntity {
    let appWriteEventEntity: EventEntity = {
      name: userEvent.Name,
      event_date: this.convertStringDateTimeToDateTimeObject(
        userEvent.EventStartDate,
        userEvent.EventStartTime
      ),
      submission_date: this.convertStringDateTimeToDateTimeObject(
        userEvent.EventEndDate,
        userEvent.EventEndTime
      ),
      no_of_guests: userEvent.NoOfGuest,
      owner_id: userEvent.OwnerId,
    };

    return appWriteEventEntity;
  }

  mapEventModelFromAppWriteEventDocument(
    document: Models.Document
  ): EventModel {
    let model: EventModel = {
      RecordId: document.$id,
      Name: document['name'],
      EventStartDate: document['event_date'],
      EventStartTime: document['event_date'],
      EventEndDate: document['submission_date'],
      EventEndTime: document['submission_date'],
      OwnerId: document['owner_id'],
      NoOfGuest: document['no_of_guests'],
    };

    return model;
  }
}
