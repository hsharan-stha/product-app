import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function createPriceValidators():ValidatorFn{
  return (control:AbstractControl):ValidationErrors | null =>{

    const value= control.value;

      if(!value){
       return null
      }

      const numberRegex=/^[0-9]+$/.test(value);

    return !numberRegex?{invalidPrice:true}:null;
  }
}
