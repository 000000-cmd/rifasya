import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  const mismatch = password && confirmPassword && password !== confirmPassword;
  if (mismatch) {
    control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else {
    if (control.get('confirmPassword')?.hasError('passwordMismatch')) {
      control.get('confirmPassword')?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    return null;
  }
}
