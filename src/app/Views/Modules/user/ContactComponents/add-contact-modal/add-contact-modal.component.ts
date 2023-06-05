import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAddressService } from 'src/app/AppServices/AppWriteServices/AddressServices/IAddressService';
import { IContactService } from 'src/app/AppServices/AppWriteServices/ContactServices/IContactService';
import { ContactsModel } from 'src/app/Models/ContactsModel';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContactNotifier } from 'src/app/AppServices/SharedComponentServices/ContactNotifier';

@Component({
  selector: 'app-add-contact-modal',
  templateUrl: './add-contact-modal.component.html',
  styleUrls: ['./add-contact-modal.component.css']
})
export class AddContactModalComponent implements OnInit {
    
  contactModel:ContactsModel={
                  RecordId: '',
                  FirstName: '',
                  LastName: '',
                  Email: '',
                  MobileNo: '',
                  CreatedById: '',
                  ContactAddress: {
                        RecordId: '',
                        Address1: '',
                        Address2: '',
                        Country: '',
                        State: '',
                        City: '',
                        Pincode: '',
                        OwnerId: ''
                    }
  };
   
  receivedContactIdFromContactTable:string=''
  contactFormGroup: FormGroup;
  
  constructor(builder: FormBuilder,
              private contactService:IContactService,
              private addressService:IAddressService,
              private contactNotifier:ContactNotifier,
              public config: DynamicDialogConfig,
              private ref: DynamicDialogRef,){

                this.contactFormGroup = builder.group({
                  firstName: [this.contactModel.FirstName,[Validators.required]],
                  lastName: [this.contactModel.LastName,Validators.required],
                  email: [this.contactModel.Email,[Validators.required, Validators.email]],
                  mobileNo:[this.contactModel.MobileNo,[Validators.required]],
                  address1:[this.contactModel.ContactAddress.Address1,[Validators.required]],
                  address2:[this.contactModel.ContactAddress.Address2,[Validators.required]],
                  country:[this.contactModel.ContactAddress.Country,[Validators.required]],
                  state:[this.contactModel.ContactAddress.State,[Validators.required]],
                  city:[this.contactModel.ContactAddress.City],
                  pincode:[this.contactModel.ContactAddress.Pincode],
                });  
               this.receivedContactIdFromContactTable = this.config.data.contactRecordId;

  }
 async ngOnInit():Promise<void> {
 
       if(this.receivedContactIdFromContactTable)
       {
         
        let response = await this.contactService.getContactByRecordIdAsync(this.receivedContactIdFromContactTable)
         if(response.IsValid)
         {
          this.contactModel = response.Success;
         }
        }
  }

  get contactFormControl()
  {
    return this.contactFormGroup.controls;
  }

  async submitFormAsync(){
    if(this.contactFormGroup.valid)
    {
        await this.createContactDetailsAsync();  
    }else
    {
       Object.keys(this.contactFormGroup.controls).forEach(field => {
         const control = this.contactFormGroup.get(field);
         control?.markAsTouched({ onlySelf: true });
        });
    }

  }


  async createContactDetailsAsync(){
   
     this.assignValueToContactModel();
    //return false;


    var result = await this.contactService.createContactWithAddress(this.contactModel);

    if(result.IsValid)
    {
      alert('contact added successfully');
      //this.contactNotifier.InvokeContactNotifier()
      this.contactFormGroup.reset(this.contactFormGroup.value);
      this.ref.close();
    }
    
  }

  assignValueToContactModel()
  {
    var firstName = this.contactFormGroup.controls['firstName'].value;
    var lastName = this.contactFormGroup.controls['lastName'].value;
    var email = this.contactFormGroup.controls['email'].value;
    var mobileNo = this.contactFormGroup.controls['mobileNo'].value;
    var address1 = this.contactFormGroup.controls['address1'].value;
    var address2 = this.contactFormGroup.controls['address2'].value;
    var country = this.contactFormGroup.controls['country'].value;
    var state = this.contactFormGroup.controls['state'].value;
    var city = this.contactFormGroup.controls['city'].value;
    var pincode = this.contactFormGroup.controls['pincode'].value;


    this.contactModel.FirstName = firstName;
    this.contactModel.LastName =lastName;
    this.contactModel.Email =email;
    this.contactModel.MobileNo =mobileNo;
    this.contactModel.ContactAddress.Address1 =address1;
    this.contactModel.ContactAddress.Address2 =address2;
    this.contactModel.ContactAddress.Country =country;
    this.contactModel.ContactAddress.State =state;
    this.contactModel.ContactAddress.City =city;
    this.contactModel.ContactAddress.Pincode =pincode;

  }
}
