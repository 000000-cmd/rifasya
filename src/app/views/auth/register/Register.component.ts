import { CommonModule } from "@angular/common";
import {Component, inject, OnInit, effect, ViewChild, Input} from "@angular/core";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import { LucideAngularModule, Shield, Zap, Star, Gift, Sparkles, Crown, User, Mail, Phone, Calendar, MapPin, Lock, IdCardIcon, Users, LoaderCircle } from 'lucide-angular';
import { InputComponent } from "../../../shared/ui/input/Input.component";
import { BadgeComponent } from "../../../shared/ui/badge.component";
import { CardComponent } from "../../../shared/ui/card/card.component";
import { CardContentComponent } from "../../../shared/ui/card/card-content.component";
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {optionalMinLength, ValidadorInput} from "../../../shared/utils/validarInput";
import { passwordMatchValidator } from "../../../shared/utils/validatePassword";
import {ListsItemsService} from '../../../core/services/listsItemsService.service';
import {BaseSelectComponent} from '../../../shared/ui/selects/BaseSelectComponent.component';
import {CheckboxComponent} from '../../../shared/ui/checkbox/CheckBox.component';
import {AuthService} from '../../../core/services/auth.service';
import {AlertService} from '../../../core/services/alert.service';
import {CustomDatepickerComponent} from '../../../shared/ui/CustomDatePicker.component';
import {LocationInputComponent} from '../../../shared/ui/input/LocationInput.component';
import {LocationModalComponent} from '../../../shared/ui/LocationModal.component';
import {validateLocation} from '../../../shared/utils/ValidateLocation';

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    RouterOutlet, CommonModule,
    LucideAngularModule, InputComponent, BadgeComponent,
    CardComponent, CardContentComponent,
    ReactiveFormsModule,
    BaseSelectComponent,
    CheckboxComponent, RouterLink, CustomDatepickerComponent, LocationInputComponent, LocationModalComponent
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
  readonly Lock = Lock;
  readonly Card = IdCardIcon;
  readonly GenderIcon = Users;
  readonly Loader = LoaderCircle;
  readonly MapPin = MapPin;

  private listService = inject(ListsItemsService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertService = inject(AlertService);

  readonly documentTypes = this.listService.documentTypes;
  readonly genders = this.listService.genders;
  readonly isLoading = this.listService.isLoading;
  isLocationModalOpen = false;
  @ViewChild(LocationInputComponent) locationInput!: LocationInputComponent;

  form = this.fb.group({
    firstName: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Nombre"), ValidadorInput(Validators.minLength(2))]),
    lastName: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Apellido"), ValidadorInput(Validators.minLength(2))]),
    username: this.fb.control<string | null>("", [ValidadorInput(optionalMinLength(3), "Usuario")]),
    birthDate: this.fb.control<string | null>(null, [ValidadorInput(Validators.required, "Fecha de nacimiento")]),
    email: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Correo"), ValidadorInput(Validators.email)]),
    phone: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Teléfono")]),
    location: this.fb.control<any | null>(null, [ValidadorInput(Validators.required, "Ubicación")]),
    gender: this.fb.control<string | null>(null, [ValidadorInput(Validators.required, "Género")]),
    docType : this.fb.control<string | null>(null, [ValidadorInput(Validators.required, "Tipo de documento")]),
    numDocument: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Número de Documento"), ValidadorInput(Validators.minLength(3)), ValidadorInput(Validators.maxLength(14))]),
    password: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Contraseña"), ValidadorInput(Validators.minLength(8))]),
    confirmPassword: this.fb.control<string | null>("", [ValidadorInput(Validators.required, "Contraseña")]),
    acceptTerms: this.fb.control<boolean>(false, [ValidadorInput(Validators.requiredTrue, "Términos y Condiciones")]),
    acceptMarketing: this.fb.control<boolean>(false),
  }, {
    validators: [passwordMatchValidator, validateLocation()]
  });

  constructor() {
    effect(() => {
      const loading = this.isLoading();
      const docTypeControl = this.form.get('docType');
      const genderControl = this.form.get('gender');
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

  onLocationSave(locationData: any) {
    const locationControl = this.form.get('location');
    locationControl?.setValue(locationData);
    locationControl?.markAsTouched(); // <-- FIX 1: Marca el campo como 'tocado'
    this.isLocationModalOpen = false;
  }

  get locationError(): string | null {
    const control = this.form.get('location');
    if (control?.errors && (control.touched || control.dirty)) {
      return control.errors['customError'] || null;
    }
    return null;
  }

  get locationTooltip(): string | undefined {
    const control = this.form.get('location');

    if (control?.hasError('locationIncomplete') && control.errors?.['missing']) {
      const missing = control.errors['missing'].join('<br>&bull; ');
      return `Faltan campos:<br>&bull; ${missing}`;
    }

    // Si es válido y ha sido tocado, no muestra tooltip
    if (control?.valid && (control.touched || control.dirty)) {
      // FIX: Devuelve 'undefined' en lugar de 'null'
      return undefined;
    }

    // Estado inicial
    return 'Selecciona tu ubicación completa, desde el país hasta el barrio/vereda.';
  }

  get locationTooltipVariant(): 'error' | 'info' {
    const control = this.form.get('location');
    if (control?.errors && (control.touched || control.dirty)) {
      return 'error';
    }
    return 'info';
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.toastError('Por favor, corrige los errores en el formulario.');
      return;
    }

    const formValue = this.form.getRawValue();
    const finalUsername = formValue.username || `${formValue.firstName || ''}${formValue.lastName || ''}`.replace(/\s/g, '').toLowerCase();

    const addressObj = formValue.location.address;
    const fullAddress = addressObj?.viaType && addressObj?.viaNumber ?
      `${addressObj.viaType} ${addressObj.viaNumber} # ${addressObj.crossStreetNumber} - ${addressObj.houseNumber}`
      : '';

    const registerPayload = {
      firstName: formValue.firstName,
      firstLastName: formValue.lastName,
      documentNumber: formValue.numDocument,
      documentCode: formValue.docType,
      genderCode: formValue.gender,
      birthDate: formValue.birthDate,
      address: fullAddress,
      neighborhoodId: formValue.location.neighborhoodId,
      user: {
        user: finalUsername,
        password: formValue.password,
        mail: formValue.email,
        cellular: formValue.phone?.replace(/\s/g, '')
      }
    };

    try {
      await this.authService.register(registerPayload);
      this.alertService.toastSuccess('¡Registro Exitoso!, Ya puedes iniciar sesión con tus credenciales.');
      await this.router.navigate(['/login']);
    } catch (error) {
      this.alertService.error('Error en el Registro', `${error}`);
    }
  }
}
