import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseFormErrors } from "./BaseFormErrors";

@Injectable({
    providedIn: 'root',
  })
export class RegisterViewFormErrors extends BaseFormErrors
{

        showInvalidPassword(formGroup:FormGroup,controlName:string):boolean
        {
        if(formGroup.controls[controlName].errors?.['invalidPassword'])
        return true;

        return false;
        }
}
