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