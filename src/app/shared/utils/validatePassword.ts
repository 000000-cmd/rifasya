import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  const error = {
    passwordMismatch: true,
    customError: 'Las contraseñas no coinciden'
  };

  const mismatch = password.value !== confirmPassword.value;

  if (mismatch) {
    confirmPassword.setErrors({ ...confirmPassword.errors, ...error });
    return error;
  } else {
    const confirmErrors = confirmPassword.errors;
    if (confirmErrors && confirmErrors['passwordMismatch']) {
      delete confirmErrors['passwordMismatch'];
      delete confirmErrors['customError'];

      if (Object.keys(confirmErrors).length === 0) {
        confirmPassword.setErrors(null);
      } else {
        confirmPassword.setErrors(confirmErrors);
      }
    }
    return null;
  }
};
