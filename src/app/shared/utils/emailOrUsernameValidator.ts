import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Validador que comprueba si el valor es un email válido o un nombre de usuario válido.
 * Un nombre de usuario válido solo contiene letras y números, sin espacios.
 */
export function emailOrUsernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null; // Dejar que el validador 'required' se encargue de los campos vacíos
    }

    // Comprueba si es un formato de email
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    // Comprueba si es un formato de nombre de usuario (solo alfanumérico)
    const isUsername = /^[a-zA-Z0-9]+$/.test(value);

    // Si no es ninguno de los dos, la validación falla
    return isEmail || isUsername ? null : { emailOrUsername: true };
  };
}
