import { EventModel, EventModelMVVM } from 'src/app/Models/EventModel';
import { PaginationSpecificationModel } from 'src/app/Models/QuerySpecificationModel';
import { ApiResponseModel } from 'src/app/Models/ResultModel';

export abstract class IEventBrokerService {
  abstract createUserEventAsync(
    userEvent: EventModel
  ): Promise<ApiResponseModel<EventModel>>;

  abstract getUserEventByUserIdAndEventIdAsync(
    userId: string,
    eventId: string,
    eventStatus: number
  ): Promise<ApiResponseModel<EventModel>>;

  abstract getListofUserEventByUserIdAndEventIdAsync(
    userId: string,
    eventId: string,
    eventStatus: number
  ): Promise<ApiResponseModel<EventModel[]>>;

  abstract getEventWithStatusHistoryByUserIdAndEventIdAsync(
    userId: string,
    eventId: string
  ): Promise<ApiResponseModel<EventModel[]>>;

  abstract getAllEventsByUserIdByPaginatedModelAsync(
    userId: string,
    paginatedModel: PaginationSpecificationModel
  ): Promise<ApiResponseModel<EventModel[]>>;
}
