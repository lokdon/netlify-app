import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAddressService } from 'src/app/AppServices/AppWriteServices/AddressServices/IAddressService';
import { IContactService } from 'src/app/AppServices/AppWriteServices/ContactServices/IContactService';
import { ContactsModel } from 'src/app/Models/ContactsModel';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.css']
})

export class ContactContainerComponent implements OnInit {
    
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
   

  contactFormGroup: FormGroup;
  
  constructor(builder: FormBuilder,
              private contactService:IContactService,
              private addressService:IAddressService){

                this.contactFormGroup = builder.group({
                  firstName: ['lokesh',[Validators.required]],
                  lastName: ['',Validators.required],
                  email: ['',[Validators.required, Validators.email]],
                  mobileNo:['',[Validators.required]],
                  address1:['',[Validators.required]],
                  address2:['',[Validators.required]],
                  country:['',[Validators.required]],
                  state:['',[Validators.required]],
                  city:[],
                  pincode:[],
                });      

  }
 async ngOnInit():Promise<void> {
 
  // this.contactModel.Email = "lk@gmail.com";
    // this.contactModel.FirstName = "lokesh";
    // this.contactModel.LastName ="contact";
    // this.contactModel.MobileNo ="456789000";
    // this.contactModel.ContactAddress.Address1 ="address1";
    // this.contactModel.ContactAddress.Address2 ="address2";
    // this.contactModel.ContactAddress.Country ="country";
    // this.contactModel.ContactAddress.State ="state";
    // this.contactModel.ContactAddress.City ="city";
    // this.contactModel.ContactAddress.Pincode ="pincode";

    // var result = await this.contactService.createContactWithAddress(this.contactModel);

    // console.log(result);

  }

  get contactFormControl()
  {
    return this.contactFormGroup.controls;
  }

  async submitFormAsync(){
    alert('submit form called');
    
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

    console.log(this.contactModel);

    //return false;


    var result = await this.contactService.createContactWithAddress(this.contactModel);

    if(result)
    {
      alert('contact added successfully');
      this.contactFormGroup.reset(this.contactFormGroup.value);
    }
    
  }

  

}
