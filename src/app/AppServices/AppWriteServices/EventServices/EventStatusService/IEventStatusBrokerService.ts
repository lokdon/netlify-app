import {
  EventModel,
  EventModelMVVM,
  EventStatusModel,
} from 'src/app/Models/EventModel';
import { ApiResponseModel } from 'src/app/Models/ResultModel';

export abstract class IEventStatusBrokerService {
  abstract createUserEventStatusAsync(
    userEventstatus: EventStatusModel
  ): Promise<ApiResponseModel<EventStatusModel>>;

  abstract getUserEventStatusByEventIdAsync(
    eventId: string
  ): Promise<ApiResponseModel<EventStatusModel[]>>;

  abstract demoFunc(): any;
}
