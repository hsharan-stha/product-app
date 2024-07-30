import {FormControl, FormGroup} from "@angular/forms";

export class FormValidateMark {


  public fieldValidation(form: FormGroup, fieldName: string) {
    return form.get(fieldName);
  }

  public checkValidation(form: FormGroup, fieldName: string) {
    return this.fieldValidation(form, fieldName)?.invalid && (this.fieldValidation(form, fieldName)?.dirty || !this.fieldValidation(form, fieldName)?.untouched);
  }


  public validateAllFormFields(currentForm: FormGroup): void {
    let firstInvalidElement: string | null = null;
    Object.keys(currentForm.controls).forEach((field) => {
      const control = currentForm.get(field);
      if (control?.status == 'INVALID' && firstInvalidElement == null) {
        firstInvalidElement = field;
      }

      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      }
    });
  }

}
