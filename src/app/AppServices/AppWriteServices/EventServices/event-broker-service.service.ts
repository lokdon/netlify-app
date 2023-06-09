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
  async updateUserEventAsync(
    userEvent: EventModel
  ): Promise<ApiResponseModel<EventModel>> {
    let apiResponse = this.createApiResponseModelForEvent();
    let appWriteEventEntity = this.mapEventEntityFromEventModal(userEvent);
    try {
      let result = await this.appWriteDataBase.updateDocument(
        AppResources.eventManagerDatabaseId,
        AppResources.eventCollectionId,
        userEvent.RecordId,
        appWriteEventEntity
      );
      //JSON.stringify(appWriteEventEntity);
      if (result.$id) {
        userEvent.RecordId = result.$id;
        apiResponse.IsValid = true;
        apiResponse.Success = userEvent;
      }
    } catch (e) {
      apiResponse.IsValid = false;
      apiResponse.Errors.push({
        Key: 'userevent_updation_error',
        Value: 'Some exception occurred whie updating event',
      });
    }

    return apiResponse;
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
  async getUserEventByEventIdAsync(
    eventId: string
  ): Promise<ApiResponseModel<EventModel>> {
    let apiResponse = this.createApiResponseModelForEvent();

    try {
      let result = await this.appWriteDataBase.getDocument(
        AppResources.eventManagerDatabaseId,
        AppResources.eventCollectionId,
        eventId
      );

      if (result.$id) {
        apiResponse.IsValid = true;
        apiResponse.Success =
          this.mapEventModelFromAppWriteEventDocument(result);
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
  async getListofUserEventByUserIdAndEventIdAsync(
    userId: string,
    eventId: string,
    eventStatus: number
  ): Promise<ApiResponseModel<EventModel[]>> {
    throw new Error('Method not implemented.');
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

  // mapEventEntityFromEventModal(userEvent: EventModel): EventEntity {
  //   let appWriteEventEntity: EventEntity = {
  //     name: userEvent.Name,
  //     event_date: this.convertStringDateTimeToDateTimeObject(
  //       userEvent.EventStartDate,
  //       userEvent.EventStartTime
  //     ),
  //     submission_date: this.convertStringDateTimeToDateTimeObject(
  //       userEvent.EventEndDate,
  //       userEvent.EventEndTime
  //     ),
  //     no_of_guests: userEvent.NoOfGuest,
  //     owner_id: userEvent.OwnerId,
  //   };

  //   return appWriteEventEntity;
  // }

  mapEventEntityFromEventModal(userEvent: EventModel): EventEntity {
    let appWriteEventEntity: EventEntity = {
      name: userEvent.Name,
      event_start_date: userEvent.EventStartDate,
      event_end_date: userEvent.EventEndDate,
      event_start_time: userEvent.EventStartTime,
      event_end_time: userEvent.EventEndTime,
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
      EventStartDate: document['event_start_date'],
      EventStartTime: document['event_start_time'],
      EventEndDate: document['event_end_date'],
      EventEndTime: document['event_end_time'],
      OwnerId: document['owner_id'],
      NoOfGuest: document['no_of_guests'],
    };

    return model;
  }
}
