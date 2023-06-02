import { EventModel, EventModelMVVM } from "src/app/Models/EventModel";

export abstract class IEventBrokerService
{
    abstract createUserEventAsync(userEvent:EventModel):Promise<boolean>;

    abstract getUserEventByUserIdAndEventIdAsync(userId:string, eventId:string,eventStatus:number):Promise<EventModel>;
    
    abstract getListofUserEventByUserIdAndEventIdAsync(userId:string, eventId:string,eventStatus:number):Promise<EventModel[]>;

    abstract getEventWithStatusHistoryByUserIdAndEventIdAsync(userId:string, eventId:string):EventModelMVVM[];
}