import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

  export function ValidadorInput(validator: ValidatorFn, fieldName: string = "campo", helperText: string = ""): ValidatorFn  {
    return (control: AbstractControl): ValidationErrors | null => {
      const result = validator(control); // ejecuta el validador real
      if (result) {
        if(helperText.trim() === "")
          for (const key in result) {
            switch (key) {
              case 'required':
                helperText= `${fieldName} requerido.`
                break;
              case 'minlength':
                const min = result['minlength'] as { requiredLength: number; actualLength: number };
                helperText= `Debe tener al menos ${min.requiredLength} caracteres`;
                break;
              case 'maxlength':
                const max = result['maxlength'] as { requiredLength: number; actualLength: number };
                helperText= `Debe tener hasta ${max.requiredLength} caracteres`;
                break;
              case 'email':
                helperText= `Correo invalido`;
                break;
              case 'emailOrUsername':
                helperText = `El formato de correo o usuario no es válido`;
                break;
              case 'pattern':
                const pattern = result['pattern'] as { requiredPattern: string; actualValue: string };
                helperText= `Debe cumplir con el siguiente patron: ${pattern.requiredPattern} `;
                break;
            }
          }

        // devolver objeto con clave = tipo de error y value = helperText
        return {         ...result, // conserva el error original
        customError: helperText };
      }

      return null; // válido
    };
  };
