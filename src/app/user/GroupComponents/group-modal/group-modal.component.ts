import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IAddressService } from 'src/app/AppServices/AppWriteServices/AddressServices/IAddressService';
import { IContactService } from 'src/app/AppServices/AppWriteServices/ContactServices/IContactService';
import { IGroupBrokerService } from 'src/app/AppServices/AppWriteServices/GroupServices/IGroupBrokerService';
import { GroupModel } from 'src/app/Models/GroupModel';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.css'],
  providers: [DialogService, MessageService]
})
export class GroupModalComponent {
  groupModel:GroupModel={
    RecordId: '',
    Name: '',
    OwnerId: '',
    Count: 0
  };

groupFormGroup: FormGroup;

constructor(builder: FormBuilder,
            private groupService:IGroupBrokerService,
            public dialogService: DialogService, 
            private ref: DynamicDialogRef,
            public messageService: MessageService)
{

  this.groupFormGroup = builder.group({
    name: ['',[Validators.required]],
  });   

}


get groupFormControl()
{
  return this.groupFormGroup.controls;
}

async submitFormAsync(){
    alert('submit form called');

    if(this.groupFormGroup.valid)
    {
       await this.createGroupAsync();  
    }else
    {
      Object.keys(this.groupFormGroup.controls).forEach(field => {
      const control = this.groupFormGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
      });
    }

  }


async createGroupAsync(){
    this.groupModel.Name = this.groupFormGroup.controls['name'].value;;
    var result = await this.groupService.createGroupForUserAsync(this.groupModel);

    if(result)
    {
        alert('contact added successfully');
        this.groupFormGroup.reset(this.groupFormGroup.value);
        console.log(this.ref);
        this.ref.close();
    }
 }
}
