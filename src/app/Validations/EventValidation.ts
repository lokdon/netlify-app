import { AbstractControl, FormGroup } from '@angular/forms';
import { BaseValidation } from './BaseValidation';
import * as moment from 'moment';

export class EventValidation extends BaseValidation {
  static EventDateGreaterThanSubmissionDate(
    eventStartDateControlName: string,
    eventSubmissionControlName: string
  ) {
    return (formGroup: FormGroup) => {
      const eventStartDateControl =
        formGroup.controls[eventStartDateControlName];
      const eventSubmissionLastDateControl =
        formGroup.controls[eventSubmissionControlName];

      if (!eventStartDateControl || !eventSubmissionLastDateControl) {
        return null;
      }

      if (eventStartDateControl.value && eventSubmissionLastDateControl.value) {
        let d1 = eventStartDateControl.value.replaceAll('/', '.');
        let d2 = eventSubmissionLastDateControl.value.replaceAll('/', '.');

        console.log(d1);
        console.log(d2);

        var startDate = moment(d1, 'DD.MM.YYYY');
        var submissionDate = moment(d2, 'DD.MM.YYYY');

        var result = 'Diff: ' + startDate.diff(submissionDate, 'days');

        if (startDate.diff(submissionDate, 'days') < 0) {
          eventSubmissionLastDateControl.setErrors({
            dateSumissionError: true,
          });
        } else {
          eventSubmissionLastDateControl.setErrors(null);
        }
      }

      // if (passwordControl.value !== confirmPasswordControl.value) {
      //   confirmPasswordControl.setErrors({ passwordMismatch: true });
      // } else {
      //   confirmPasswordControl.setErrors(null);
      // }

      return null;
    };
  }

  //   static userNameValidator(userControl: AbstractControl) {
  //     return new Promise(resolve => {
  //       setTimeout(() => {
  //         if (this.validateUserName(userControl.value)) {
  //           resolve({ userNameNotAvailable: true });
  //         } else {
  //           resolve(null);
  //         }
  //       }, 1000);
  //     });
  //   }
}
