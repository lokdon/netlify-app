import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IEventStatusBrokerService } from 'src/app/AppServices/AppWriteServices/EventServices/EventStatusService/IEventStatusBrokerService';
import { IEventBrokerService } from 'src/app/AppServices/AppWriteServices/EventServices/IEventBrokerService';
import { IUserBrokerService } from 'src/app/AppServices/AppWriteServices/UserServices/IUseBrokerService';
import { EventNotifier } from 'src/app/AppServices/SharedComponentServices/EventNotifier';
import {
  EventModel,
  EventStatus,
  EventStatusModel,
} from 'src/app/Models/EventModel';
import { EventValidation } from 'src/app/Validations/EventValidation';
import { EventModalViewFormErrors } from 'src/app/Validations/FormErrors/EventModalViewFormErrors';

@Component({
  selector: 'app-eventmodal',
  templateUrl: './eventmodal.component.html',
  styleUrls: ['./eventmodal.component.css'],
})
export class EventmodalComponent {
  eventModal: EventModel = {
    RecordId: '',
    Name: '',
    EventStartDate: '',
    EventStartTime: '',
    EventEndDate: '',
    EventEndTime: '',
    OwnerId: '',
    NoOfGuest: 0,
  };

  receivedEventModalRecordId: string = '';
  eventFormGroup: FormGroup;
  userId: string = '';
  submit: string = 'submit';

  eventFormErrors: EventModalViewFormErrors | undefined;
  readonly requiredError: string = 'This Field is required';
  readonly inValidEmailError: string = 'Enter a valid email address';
  readonly invalidPassword: string =
    'One Upper case one lower case and special required';

  readonly dateSumissionError: string =
    'Submission date must be prior to event date';

  isFormSubmitted: boolean = false;

  minimumDate = new Date();

  constructor(
    private eventService: IEventBrokerService,
    private eventStatusService: IEventStatusBrokerService,
    private userService: IUserBrokerService,
    private userEventNotifier: EventNotifier,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    eventFormErrors: EventModalViewFormErrors,
    builder: FormBuilder
  ) {
    this.eventFormGroup = builder.group(
      {
        name: [this.eventModal.Name, [Validators.required]],
        eventStartDate: [this.eventModal.EventStartDate, Validators.required],
        eventStartTime: [this.eventModal.EventStartTime, [Validators.required]],
        eventEndDate: [this.eventModal.EventEndDate, [Validators.required]],
        eventEndTime: [this.eventModal.EventEndTime, [Validators.required]],
        noOfGuest: [this.eventModal.NoOfGuest, [Validators.required]],
      },
      {
        validator: EventValidation.EventDateGreaterThanSubmissionDate(
          'eventStartDate',
          'eventEndDate'
        ),
      }
    );
    this.receivedEventModalRecordId = this.config.data.id;
    this.eventFormErrors = eventFormErrors;
  }

  async ngOnInit(): Promise<void> {
    this.userId = await this.userService.getCurrentLoggedInUserIdAsync();

    if (this.receivedEventModalRecordId) {
      let response = await this.eventService.getUserEventByEventIdAsync(
        this.receivedEventModalRecordId
      );

      if (response.IsValid) {
        this.eventModal = response.Success;
        this.assignEventModalValueToFormControlFields(this.eventModal);
      } else {
        alert('Error occurred while fetching data for event modal');
      }
    }

    //this.eventFormControl['name'].setValue("my event");
  }

  get eventFormControl() {
    return this.eventFormGroup.controls;
  }

  async submitFormAsync() {
    console.log(this.eventFormGroup);

    if (this.eventFormGroup.valid) {
      if (this.receivedEventModalRecordId) {
        this.updateEventAsync();
      } else {
        await this.createEventDetailsAsync();
      }
    } else {
      Object.keys(this.eventFormGroup.controls).forEach((field) => {
        const control = this.eventFormGroup.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  resetForm() {
    this.ref.close();
  }

  async createEventDetailsAsync() {
    //this.assignValueToContactModel();
    //return false;
    await this.assignFormValueToEventModel();
    var result = await this.eventService.createUserEventAsync(this.eventModal);

    if (result.IsValid) {
      // this.eventStatusService.demoFunc();
      await this.saveEventStatusAsync(
        result.Success.RecordId,
        EventStatus.Created
      );
      this.userEventNotifier.InvokeEventNotifier(result.Success.RecordId);
      this.ref.close();
    } else {
      alert('some error occurred');
    }

    // if(result.IsValid)
    // {
    //   alert('contact added successfully');
    //   //this.contactNotifier.InvokeContactNotifier()
    //   this.contactFormGroup.reset(this.contactFormGroup.value);
    //   this.ref.close();
    // }
  }

  async updateEventAsync() {
    await this.assignFormValueToEventModel();
    console.log('just before updation');
    console.log(this.eventModal);

    var result = await this.eventService.updateUserEventAsync(this.eventModal);
    console.log('after updation');
    console.log(this.eventModal);
    if (result.IsValid) {
      // this.eventStatusService.demoFunc();
      await this.saveEventStatusAsync(
        result.Success.RecordId,
        EventStatus.Updated
      );
      this.userEventNotifier.InvokeEventNotifier(result.Success.RecordId);
      this.ref.close();
    } else {
      alert('some error occurred');
    }
  }

  async saveEventStatusAsync(eventId: string, eventStatue: EventStatus) {
    let currentUserId = await this.userService.getCurrentLoggedInUserIdAsync();

    let eventStatusModel: EventStatusModel = {
      RecordId: '',
      EventId: eventId,
      Status: eventStatue,
      FromUserId: currentUserId,
      ToUserId: currentUserId,
      StatusDate: new Date(),
    };

    let respose = await this.eventStatusService.createUserEventStatusAsync(
      eventStatusModel
    );

    if (respose.IsValid) {
      alert('status saved successgully');
    } else {
      alert('problem in saving event status');
    }
  }

  assignEventModalValueToFormControlFields(eventModal: EventModel) {
    this.eventFormGroup.controls['name'].setValue(eventModal.Name);
    this.eventFormGroup.controls['eventStartDate'].setValue(
      eventModal.EventStartDate
    );
    this.eventFormGroup.controls['eventStartTime'].setValue(
      eventModal.EventStartTime
    );
    this.eventFormGroup.controls['eventEndDate'].setValue(
      eventModal.EventEndDate
    );
    this.eventFormGroup.controls['eventEndTime'].setValue(
      eventModal.EventEndTime
    );
    this.eventFormGroup.controls['noOfGuest'].setValue(eventModal.NoOfGuest);
  }

  async assignFormValueToEventModel() {
    var name = this.eventFormGroup.controls['name'].value;
    var eventStartDate = this.eventFormGroup.controls['eventStartDate'].value;
    var eventStartTime = this.eventFormGroup.controls['eventStartTime'].value;
    var eventEndDate = this.eventFormGroup.controls['eventEndDate'].value;
    var eventEndTime = this.eventFormGroup.controls['eventEndTime'].value;
    var noOfGuest = this.eventFormGroup.controls['noOfGuest'].value;

    this.eventModal.Name = name;
    this.eventModal.EventStartDate = eventStartDate;
    this.eventModal.EventEndDate = eventEndDate;
    this.eventModal.EventStartTime = eventStartTime;
    this.eventModal.EventEndTime = eventEndTime;
    this.eventModal.NoOfGuest = noOfGuest;
    if (!this.eventModal.RecordId) {
      this.eventModal.OwnerId =
        await this.userService.getCurrentLoggedInUserIdAsync();
    }
  }

  // getEventStatusModel(event): EventStatusModel {
  //      let eventStatusModel: EventStatusModel = {
  //     RecordId: '',
  //     EventId: eventId,
  //     Status: EventStatus.Created,
  //     FromUserId: await this.userService.getCurrentLoggedInUserIdAsync(),
  //     ToUserId: await this.userService.getCurrentLoggedInUserIdAsync(),
  //     StatusDate: new Date(),
  //   };

  // }
}
