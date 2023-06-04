import { AbstractControl, FormGroup } from "@angular/forms";
import { BaseValidation } from "./BaseValidation";

export class RegisterValidation extends BaseValidation
{
    static MatchPassword(password: string, confirmPassword: string) {
        return (formGroup: FormGroup) => {
          const passwordControl = formGroup.controls[password];
          const confirmPasswordControl = formGroup.controls[confirmPassword];
    
          if (!passwordControl || !confirmPasswordControl) {
            return null;
          }
    
          if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
            return null;
          }
    
          if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ passwordMismatch: true });
          } else {
            confirmPasswordControl.setErrors(null);
          }
    
          return null;
        }
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