import { CommonModule } from "@angular/common";
import {Component, inject, Optional, Self} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LogoComponent } from "../../../shared/UI/logo.component";
import { LucideAngularModule, Shield, Zap, Star, Gift, Sparkles, Crown, User, Mail, Phone, Calendar, MapPin, Lock, IdCard } from 'lucide-angular';
import { InputComponent } from "../../../shared/UI/Input.component";
import { BadgeComponent } from "../../../shared/UI/badge.component";
import { CardComponent } from "../../../shared/UI/card/card.component";
import { CardHeaderComponent } from "../../../shared/UI/card/card-header.component";
import { CardContentComponent } from "../../../shared/UI/card/card-content.component";
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn  } from '@angular/forms';
import { ValidadorInput } from "../../../shared/utils/validarInput";
import { BaseSelectComponent } from "../../../shared/UI/selects/base-select.component";
import { BaseSelectItemComponent } from "../../../shared/UI/selects/base-select-item.component";
import { SelectDocumentTypeComponent } from "../../../shared/features/select/tipoDoc.component";


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
    ReactiveFormsModule, SelectDocumentTypeComponent],             // Componentes importados que usaras en la vista
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
  readonly Card = IdCard; 

  private fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: ['', 
    [
      ValidadorInput(Validators.required),
      ValidadorInput(Validators.minLength(2))
    ] ],
    lastName: ['', 
    [
      ValidadorInput(Validators.required), 
      ValidadorInput(Validators.minLength(2))
    ]],
    email: ['', 
      [
        ValidadorInput(Validators.required), 
        ValidadorInput(Validators.email)
      ]],
    phone: ['', [
      ValidadorInput(Validators.required),
      ValidadorInput(Validators.pattern(/^\+?[1-9]{3} \d{1,14}$/)) // E.164
    ]],
    birthDate: ['', ValidadorInput(Validators.required)],
    city: ['', [ValidadorInput(Validators.required), ValidadorInput(Validators.minLength(2))]],
    password: ['', [ValidadorInput(Validators.required),ValidadorInput( Validators.minLength(8))]],
    confirmPassword: ['', ValidadorInput(Validators.required)],
    acceptTerms: [false, ValidadorInput(Validators.requiredTrue)],
    acceptMarketing: [false],
    tipoDoc: ['']
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
