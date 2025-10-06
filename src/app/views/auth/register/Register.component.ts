import { CommonModule } from "@angular/common";
// 1. Importamos 'effect' de Angular core
import {Component, inject, OnInit, effect} from "@angular/core";
import {Router, RouterOutlet} from "@angular/router";
import { LogoComponent } from "../../../shared/ui/logo.component";
import { LucideAngularModule, Shield, Zap, Star, Gift, Sparkles, Crown, User, Mail, Phone, Calendar, MapPin, Lock, IdCardIcon, Users, LoaderCircle } from 'lucide-angular';
import { InputComponent } from "../../../shared/ui/input/Input.component";
import { BadgeComponent } from "../../../shared/ui/badge.component";
import { CardComponent } from "../../../shared/ui/card/card.component";
import { CardHeaderComponent } from "../../../shared/ui/card/card-header.component";
import { CardContentComponent } from "../../../shared/ui/card/card-content.component";
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ValidadorInput } from "../../../shared/utils/validarInput";
import { passwordMatchValidator } from "../../../shared/utils/validatePassword";
import {ListsItemsService} from '../../../core/services/listsItemsService.service';
import {BaseSelectComponent} from '../../../shared/ui/selects/BaseSelectComponent.component';
import {CheckboxComponent} from '../../../shared/ui/checkbox/CheckBox.component';
import {AuthService} from '../../../core/services/auth.service';
import {AlertService} from '../../../core/services/alert.service';

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    RouterOutlet, CommonModule, LogoComponent,
    LucideAngularModule, InputComponent, BadgeComponent,
    CardComponent, CardHeaderComponent, CardContentComponent,
    ReactiveFormsModule,
    BaseSelectComponent,
    CheckboxComponent
  ],
  templateUrl: './Register.html',
  styleUrl: './Register.scss'
})
export class Register implements OnInit {
  // --- Iconos ---
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
  readonly GenderIcon = Users;
  readonly Loader = LoaderCircle;

  private listService = inject(ListsItemsService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertService = inject(AlertService);

  readonly documentTypes = this.listService.documentTypes;
  readonly genders = this.listService.genders;
  readonly isLoading = this.listService.isLoading;

  form = this.fb.group({
    firstName: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Nombre"), ValidadorInput(Validators.minLength(2))]),
    lastName: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Apellido"), ValidadorInput(Validators.minLength(2))]),
    email: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Correo"), ValidadorInput(Validators.email)]),
    phone: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Teléfono")]),
    birthDate: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Fecha de nacimiento")]),
    city: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Ciudad"), ValidadorInput(Validators.minLength(2))]),
    gender: this.fb.control<string | null>(null, [ValidadorInput(Validators.required, "Género")]),
    docType : this.fb.control<string | null>(null, [ValidadorInput(Validators.required, "Tipo de documento")]),
    numDocument: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Número de Documento"), ValidadorInput(Validators.minLength(3)), ValidadorInput(Validators.maxLength(14))]),
    password: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Contraseña"), ValidadorInput(Validators.minLength(8))]),
    confirmPassword: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Contraseña")]),
    acceptTerms: this.fb.control<boolean>(false, [ValidadorInput(Validators.requiredTrue, "Términos y Condiciones")]),
    acceptMarketing: this.fb.control<boolean>(false),
  }, { validators: passwordMatchValidator });

  constructor() {
    // Un 'effect' reacciona a los cambios en los signals que lee.
    effect(() => {
      const loading = this.isLoading(); // Leemos el signal
      const docTypeControl = this.form.get('docType');
      const genderControl = this.form.get('gender');

      // Deshabilitamos o habilitamos los controles desde el código.
      if (loading) {
        docTypeControl?.disable();
        genderControl?.disable();
      } else {
        docTypeControl?.enable();
        genderControl?.enable();
      }
    });
  }

  ngOnInit(): void {
    this.listService.loadDocumentTypes();
    this.listService.loadGenders();
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.toastError('Por favor, corrige los errores en el formulario.');
      return;
    }

    const formValue = this.form.value;
    const registerPayload = {
      firstName: formValue.firstName,
      firstLastName: formValue.lastName,
      documentNumber: formValue.numDocument,
      documentCode: formValue.docType,
      genderCode: formValue.gender,
      user: {
        user: formValue.email,
        password: formValue.password,
        mail: formValue.email,
        cellular: formValue.phone?.replace(/\s/g, '')
      }
    };

    try {
      await this.authService.register(registerPayload);
      this.alertService.success('¡Registro Exitoso!', 'Ya puedes iniciar sesión con tus credenciales.');
      this.router.navigate(['/login']);
    } catch (error) {
      this.alertService.error('Error en el Registro', `${error}`);
    }
  }
}
