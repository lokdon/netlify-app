import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
 export abstract class BaseValidation {

  static patternValidator() {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {error: null}
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? { invalidPassword: false } : { invalidPassword: true };
    };
  }

  static newPatternValidation(control:FormControl)
  {
     if(control.value)
     {
        const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
        const valid = regex.test(control.value);
        return valid ? { invalidPassword: false } : { invalidPassword: true };
     }
     return {error: null}
  }
 
}