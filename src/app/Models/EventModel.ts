export type EventModel = {
  RecordId: string;
  Name: string;
  EventStartDate: string;
  EventStartTime: string;
  EventEndDate: string;
  EventEndTime: string;
  OwnerId: string;
  NoOfGuest: number;
};

export type EventEntity = {
  name: string;
  event_date: Date;
  submission_date: Date;
  no_of_guests: number;
  owner_id: string;
};

export type SubEventModel = {
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
  Created = 1, //event created
  CreatedSent, //sent to invite guest
  Received, //events that we have accepted
  Replied, //reply to the invitation
}

export type EventStatusModel = {
  RecordId: string;
  EventId: string;
  Status: number;
  FromUserId: string;
  ToUserId: string;
  StatusDate: Date;
};

export type EventStatusEntity = {
  event_id: string;
  status: number;
  received_from_user_id: string;
  send_to_user_id: string;
  status_date: Date;
};
