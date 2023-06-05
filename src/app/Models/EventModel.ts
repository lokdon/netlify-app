export type EventModel={
    $Id:string;
    Name:string;
    EventDate:Date
    SubmissionDate:Date
    EventStatus:number
    UserId:string;
    OwnerId:string;
    IsOwned:boolean;
    NoOfGuest:number
}

export type SubEventModel={
    $Id:string;
    Name:string;
    EventDate:Date
    SubmissionDate:Date
    EventStatus:number
    ParentEventId:string
}


export type EventModelMVVM={
   ParentEvent:EventModel;
   EventStatusHistory : SubEventModel[]
}


export enum EventStatus{
    Received=1, //events that we have accepted
    Upcoming, //received upcoming events
    Expired, //invited events expired
    Created, //event created
    CreatedSent, //sent to invite guest
    ReceivedSent //reply to the invitation

} 