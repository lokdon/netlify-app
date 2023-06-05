import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IAddressService } from 'src/app/AppServices/AppWriteServices/AddressServices/IAddressService';
import { IContactService } from 'src/app/AppServices/AppWriteServices/ContactServices/IContactService';
import { IGroupBrokerService } from 'src/app/AppServices/AppWriteServices/GroupServices/IGroupBrokerService';
import { GroupServiceNotifier } from 'src/app/AppServices/SharedComponentServices/GroupServiceNotifier';
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

  createdGroupId:string=''

groupFormGroup: FormGroup;

constructor(builder: FormBuilder,
            private groupService:IGroupBrokerService,
            public dialogService: DialogService, 
            private ref: DynamicDialogRef,
            public messageService: MessageService,
            public groupNotifier:GroupServiceNotifier)
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
    if(this.groupFormGroup.valid)
    {
      await this.createGroupAsync();
      this.groupNotifier.InvokeGroupMessageEvent(this.groupModel.RecordId);   
    }else
    {
      Object.keys(this.groupFormGroup.controls).forEach(field => {
      const control = this.groupFormGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
      });
    }

  }

  closeDialogBox()
  {
    alert('called close button');
    this.ref.close();
  }


async createGroupAsync(){
    this.groupModel.Name = this.groupFormGroup.controls['name'].value;;
    var result = await this.groupService.createGroupForUserAsync(this.groupModel);

    if(result.IsValid)
    {
        this.groupModel = result.Success;
        this.groupFormGroup.reset(this.groupFormGroup.value);
        this.ref.close();
    }
 }
}
