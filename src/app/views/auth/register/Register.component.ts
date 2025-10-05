import { CommonModule } from "@angular/common";
import {Component, inject, Optional, Self} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LogoComponent } from "../../../shared/ui/logo.component";
import { LucideAngularModule, Shield, Zap, Star, Gift, Sparkles, Crown, User, Mail, Phone, Calendar, MapPin, Lock, IdCard, IdCardIcon, Transgender } from 'lucide-angular';
import { InputComponent } from "../../../shared/ui/input/Input.component";
import { BadgeComponent } from "../../../shared/ui/badge.component";
import { CardComponent } from "../../../shared/ui/card/card.component";
import { CardHeaderComponent } from "../../../shared/ui/card/card-header.component";
import { CardContentComponent } from "../../../shared/ui/card/card-content.component";
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn  } from '@angular/forms';
import { ValidadorInput } from "../../../shared/utils/validarInput";
import { BaseSelectItemComponent } from "../../../shared/ui/selects/BaseSelectItem.component";
import { passwordMatchValidator } from "../../../shared/utils/validatePassword";
import {ListItem} from '../../../core/models/TypeItem.model';
import {BaseSelectComponent} from '../../../shared/ui/selects/BaseSelectComponent.component';



@Component({
  selector: 'register',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LogoComponent,
    LucideAngularModule, InputComponent, BadgeComponent,
    CardComponent, CardHeaderComponent, CardContentComponent,
    ReactiveFormsModule, BaseSelectComponent, BaseSelectItemComponent],             // Componentes importados que usaras en la vista
  templateUrl: './Register.html', // HTML de esta vista
  styleUrl: './Register.scss'      // estilos locales
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
  readonly Card = IdCardIcon;
  readonly GenderIcon = Transgender;

  private fb = inject(FormBuilder);

  documentTypes: ListItem[] = [
    { code: 'NULL', name: 'Seleccionar...', order: 1 },
    { code: 'CC', name: 'Cédula de Ciudadanía', order: 2 },
    { code: 'CE', name: 'Cédula de Extranjería', order: 3 },
    { code: 'TI', name: 'Tarjeta de Identidad', order: 4 },
    { code: 'PAS', name: 'Pasaporte', order: 5 }
  ];

  genders: ListItem[] = [
    { code: 'NULL', name: 'Seleccionar...', order: 1 },
    { code: 'M', name: 'Masculino', order: 2 },
    { code: 'F', name: 'Femenino', order: 3 },
    { code: 'O', name: 'Otro', order: 4 }
  ];


  form = this.fb.group({
    firstName: this.fb.control<string | null>("", [
      ValidadorInput(Validators.required, "Nombre"),
      ValidadorInput(Validators.minLength(2))
    ]),
    lastName: this.fb.control<string | null>("", [
      ValidadorInput(Validators.required, "Segundo nombre"),
      ValidadorInput(Validators.minLength(2))
    ]),
    email: this.fb.control<string | null>("", [
      ValidadorInput(Validators.required, "Correo"),
      ValidadorInput(Validators.email)
    ]),
    phone: this.fb.control<string | null>("", [
      ValidadorInput(Validators.required, "Telefono"),
      ValidadorInput(Validators.pattern(/^\+?[1-9]{3} \d{1,14}$/)) // formato E.164
    ]),
    numDocument: this.fb.control<string | null>("", [
      ValidadorInput(Validators.required, "Número de Documento"),
      ValidadorInput(Validators.pattern(/\d/ ), "Número de Documento", "Solo se permiten Números") ,
      ValidadorInput(Validators.minLength(3), "Número de Documento"),
      ValidadorInput(Validators.maxLength(14), "Número de Documento"),
    ]),
    birthDate: this.fb.control<string | null>("", [
      ValidadorInput(Validators.required, "Fecha de nacimiento")
    ]),
    city: this.fb.control<string | null>("", [
      ValidadorInput(Validators.required, "Ciudad"),
      ValidadorInput(Validators.minLength(2))
    ]),
    gender: this.fb.control<string | null>(null, [
      ValidadorInput(Validators.required, "Género")
    ]),
    docType : this.fb.control<string | null>(null, [
      ValidadorInput(Validators.required, "Tipo de documento")
    ]),
    password: this.fb.control<string | null>("", [
      ValidadorInput(Validators.required, "Contraseña"),
      ValidadorInput(Validators.minLength(8))
    ]),
    confirmPassword: this.fb.control<string | null>("", [
      ValidadorInput(Validators.required, "Contraseña")
    ]),
    acceptTerms: this.fb.control<boolean>(false, [
      ValidadorInput(Validators.requiredTrue, "Terminos y Condiciones")
    ]),
    acceptMarketing: this.fb.control<boolean>(false),

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
