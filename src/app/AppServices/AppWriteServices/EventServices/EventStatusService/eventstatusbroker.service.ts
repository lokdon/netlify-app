import { Injectable } from '@angular/core';
import { IEventStatusBrokerService } from './IEventStatusBrokerService';
import { EventStatusEntity, EventStatusModel } from 'src/app/Models/EventModel';
import { ApiResponseModel } from 'src/app/Models/ResultModel';
import { AppResources } from 'src/app/AppServices/AppResources';
import { Client, Databases, ID } from 'appwrite';
import { AppWriteHttpClientService } from 'src/app/AppServices/app-write-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class EventStatusBrokerService implements IEventStatusBrokerService {
  appWriteDataBase: Databases;
  appWriteClient: Client;
  userId: string = '';

  constructor(private appWriteHttpService: AppWriteHttpClientService) {
    this.appWriteClient = appWriteHttpService.getClient();
    this.appWriteDataBase = new Databases(this.appWriteClient);
  }
  async demoFunc() {
    console.log('function callled');
  }

  async createUserEventStatusAsync(
    userEventstatus: EventStatusModel
  ): Promise<ApiResponseModel<EventStatusModel>> {
    let apiResponse = this.getEmptyApiResponseModelTypeForEventStatus();
    console.log(userEventstatus);

    let appWriteEventEntity =
      this.getEventStatusEntityFromEventstatusModal(userEventstatus);

    try {
      let result = await this.appWriteDataBase.createDocument(
        AppResources.eventManagerDatabaseId,
        AppResources.eventStatusCollectionId,
        ID.unique(),
        appWriteEventEntity
      );

      if (result.$id) {
        userEventstatus.RecordId = result.$id;
        apiResponse.IsValid = true;
        apiResponse.Success = userEventstatus;
      }
    } catch (e) {
      apiResponse.IsValid = false;
      apiResponse.Errors.push({
        Key: 'userevent_status_saving_error',
        Value: 'Some exception occurred whie saving event',
      });
    }

    return apiResponse;
  }
  async getUserEventStatusByEventIdAsync(
    eventId: string
  ): Promise<ApiResponseModel<EventStatusModel[]>> {
    throw new Error('Method not implemented.');
  }

  getEmptyApiResponseModelTypeForEventStatus(): ApiResponseModel<EventStatusModel> {
    let apiResponse: ApiResponseModel<EventStatusModel> = {
      IsValid: false,
      Errors: [],
      Success: {
        RecordId: '',
        EventId: '',
        Status: 0,
        FromUserId: '',
        ToUserId: '',
        StatusDate: new Date(),
      },
      TotalRecordCount: 0,
    };

    return apiResponse;
  }

  getEventStatusEntityFromEventstatusModal(
    eventStatusModal: EventStatusModel
  ): EventStatusEntity {
    let appWriteEventStatusEntity: EventStatusEntity = {
      event_id: eventStatusModal.EventId,
      status: eventStatusModal.Status,
      received_from_user_id: eventStatusModal.FromUserId,
      send_to_user_id: eventStatusModal.ToUserId,
      status_date: eventStatusModal.StatusDate,
    };
    return appWriteEventStatusEntity;
  }
}
