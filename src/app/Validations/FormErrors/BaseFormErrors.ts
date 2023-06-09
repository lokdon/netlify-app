import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

export abstract class BaseFormErrors {
  isFormControlValid(
    formGroup: FormGroup,
    controlName: string,
    submitted: boolean
  ): boolean {
    if (
      formGroup.controls[controlName].invalid &&
      (formGroup.controls[controlName].dirty ||
        formGroup.controls[controlName].touched ||
        submitted)
    ) {
      return true;
    }

    return false;
  }

  showRequiredError(formGroup: FormGroup, controlName: string): boolean {
    if (formGroup.controls[controlName].errors?.['required']) return true;

    return false;
  }

  showValidEmailError(formGroup: FormGroup, controlName: string): boolean {
    if (formGroup.controls[controlName].errors?.['email']) return true;

    return false;
  }
}
