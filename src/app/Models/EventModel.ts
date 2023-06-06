export type EventModel = {
  RecordId: string;
  Name: string;
  EventStartDate: string;
  EventStartTime: string;
  EventEndDate: string;
  EventEndTime: string;
  EventStatus: number;
  OwnerId: string;
  NoOfGuest: number;
};

export type SubEventModel = {
  $Id: string;
  Name: string;
  EventDate: Date;
  SubmissionDate: Date;
  EventStatus: number;
  ParentEventId: string;
};

export type EventModelMVVM = {
  ParentEvent: EventModel;
  EventStatusHistory: SubEventModel[];
};

export enum EventStatus {
  Received = 1, //events that we have accepted
  Upcoming, //received upcoming events
  Expired, //invited events expired
  Created, //event created
  CreatedSent, //sent to invite guest
  ReceivedSent, //reply to the invitation
}

export type EventEntity = {
  name: string;
  event_date: Date;
  submission_date: Date;
  event_status: number;
  no_of_guests: number;
  owner_id: string;
};
