import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IEventBrokerService } from 'src/app/AppServices/AppWriteServices/EventServices/IEventBrokerService';
import { IUserBrokerService } from 'src/app/AppServices/AppWriteServices/UserServices/IUseBrokerService';
import { EventModel, EventStatus } from 'src/app/Models/EventModel';

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
    EventStatus: 0,
    OwnerId: '',
    NoOfGuest: 0,
  };

  receivedEventModalRecordId: string = '';
  eventFormGroup: FormGroup;
  userId: string = '';
  submit: string = 'submit';

  constructor(
    private eventService: IEventBrokerService,
    private userService: IUserBrokerService,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    builder: FormBuilder
  ) {
    this.eventFormGroup = builder.group({
      name: [this.eventModal.Name, [Validators.required]],
      eventStartDate: [this.eventModal.EventStartDate, Validators.required],
      eventStartTime: [this.eventModal.EventStartTime, [Validators.required]],
      eventEndDate: [this.eventModal.EventEndDate, [Validators.required]],
      eventEndTime: [this.eventModal.EventEndTime, [Validators.required]],
      noOfGuest: [this.eventModal.NoOfGuest, [Validators.required]],
    });
    this.receivedEventModalRecordId = this.config.data.id;
  }

  async ngOnInit(): Promise<void> {
    this.userId = await this.userService.getCurrentLoggedInUserIdAsync();

    if (this.receivedEventModalRecordId) {
      let response =
        await this.eventService.getUserEventByUserIdAndEventIdAsync(
          this.userId,
          this.receivedEventModalRecordId,
          EventStatus.Created
        );

      if (response) {
        //this.eventModal = response;
      }
    }

    //this.eventFormControl['name'].setValue("my event");
  }

  get eventFormControl() {
    return this.eventFormGroup.controls;
  }

  async submitFormAsync() {
    if (this.eventFormGroup.valid) {
      await this.createEventDetailsAsync();
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

    console.log(this.eventModal);
    return;
    var result = await this.eventService.createUserEventAsync(this.eventModal);

    if (result.IsValid) {
      alert('event created successfully');
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

  async assignFormValueToEventModel() {
    var name = this.eventFormGroup.controls['name'].value;
    var eventStartDate = this.eventFormGroup.controls['eventStartDate'].value;
    console.log(eventStartDate);
    var eventStartTime = this.eventFormGroup.controls['eventStartTime'].value;
    console.log(eventStartTime);
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
      this.eventModal.EventStatus = EventStatus.Created;
      this.eventModal.OwnerId =
        await this.userService.getCurrentLoggedInUserIdAsync();
    }
  }
}
