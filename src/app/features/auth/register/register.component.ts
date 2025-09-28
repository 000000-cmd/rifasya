import { CommonModule } from "@angular/common";
import {Component, inject, Optional, Self} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LogoComponent } from "../../../shared/UI/logo.component";
import { LucideAngularModule, Shield, Zap, Star, Gift, Sparkles, Crown, User, Mail, Phone, Calendar, MapPin, Lock } from 'lucide-angular';
import { InputComponent } from "../../../shared/UI/Input.component";
import { BadgeComponent } from "../../../shared/UI/badge.component";
import { CardComponent } from "../../../shared/UI/card/card.component";
import { CardHeaderComponent } from "../../../shared/UI/card/card-header.component";
import { CardContentComponent } from "../../../shared/UI/card/card-content.component";
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormControl, NgControl
} from '@angular/forms';

// 🔹 Validador custom para confirmar contraseña
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
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


@Component({
  selector: 'register',                // nombre de la etiqueta
  standalone: true,                    // ← standalone obligatorio
  imports: [RouterOutlet, CommonModule, LogoComponent,
    LucideAngularModule, InputComponent, BadgeComponent,
    CardComponent, CardHeaderComponent, CardContentComponent,
    ReactiveFormsModule],             // Componentes importados que usaras en la vista
  templateUrl: './register.html', // HTML de esta vista
  styleUrl: './register.css'      // estilos locales
})

export class Register {
  readonly Shield = Shield;
  readonly Zap = Zap;
  readonly Star = Star;
  readonly Gift = Gift;
  readonly Sparkles = Sparkles;
  readonly Crown = Crown;
  readonly User = User;
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly Calendar = Calendar;
  readonly MapPin = MapPin;
  readonly Lock = Lock;

  private fb = inject(FormBuilder);

  public ValidadorInput = (validator: ValidatorFn, fieldName: string = "campo", helperText: string = ""): ValidatorFn => {
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


  form = this.fb.group({
    firstName: this.fb.control<string | null>("", [
      this.ValidadorInput(Validators.required, "Nombre"),
      this.ValidadorInput(Validators.minLength(2))
    ]),
    lastName: this.fb.control<string | null>("", [
      this.ValidadorInput(Validators.required, "Segundo nombre"),
      this.ValidadorInput(Validators.minLength(2))
    ]),
    email: this.fb.control<string | null>("", [
      this.ValidadorInput(Validators.required, "Correo"),
      this.ValidadorInput(Validators.email)
    ]),
    phone: this.fb.control<string | null>("", [
      this.ValidadorInput(Validators.required, "Telefono"),
      this.ValidadorInput(Validators.pattern(/^\+?[1-9]{3} \d{1,14}$/)) // formato E.164
    ]),
    birthDate: this.fb.control<string | null>("", [
      this.ValidadorInput(Validators.required, "Fecha de nacimiento")
    ]),
    city: this.fb.control<string | null>("", [
      this.ValidadorInput(Validators.required, "Ciudad"),
      this.ValidadorInput(Validators.minLength(2))
    ]),
    password: this.fb.control<string | null>("", [
      this.ValidadorInput(Validators.required, "Contraseña"),
      this.ValidadorInput(Validators.minLength(8))
    ]),
    confirmPassword: this.fb.control<string | null>("", [
      this.ValidadorInput(Validators.required, "Contraseña")
    ]),
    acceptTerms: this.fb.control<boolean>(false, [
      this.ValidadorInput(Validators.requiredTrue, "Terminos y Condiciones")
    ]),
    acceptMarketing: this.fb.control<boolean>(false)
  }, { validators: passwordMatchValidator });

  get f() {
    return this.form.controls;
  }


  onSubmit() {
    if (this.form.valid) {
      console.log('✅ Datos del formulario:', this.form.value);
      alert("¡Registro exitoso! (Esto es una demo)");
    } else {
      console.warn("⚠️ Errores en el formulario:", this.form.errors, this.form.value);
      this.form.markAllAsTouched();
    }
  }
}
