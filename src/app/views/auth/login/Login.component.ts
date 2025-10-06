import { Component, inject, OnInit, OnDestroy } from "@angular/core";
// 1. Importamos el ícono 'Mail' y las herramientas para manejar subscripciones
import { KeyRound, User, Mail, LucideIconData } from "lucide-angular";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputComponent } from "../../../shared/ui/input/Input.component";
import { ButtonComponent } from "../../../shared/ui/buttons/button/button.component";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ValidadorInput } from "../../../shared/utils/validarInput";
import { emailOrUsernameValidator } from '../../../shared/utils/emailOrUsernameValidator';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../core/services/alert.service';


@Component({
  selector: 'login',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl:'./Login.html'
})

export class Login implements OnInit, OnDestroy {
  // --- Iconos ---
  readonly User = User;
  readonly Key = KeyRound;
  readonly Mail = Mail; // 2. Hacemos el ícono de Mail accesible en la clase

  emailOrUsernameIcon: LucideIconData = User;
  private unsubscribe$ = new Subject<void>();

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertService = inject(AlertService);

  form = this.fb.group({
    email: this.fb.control<String | null>("",[
      ValidadorInput(Validators.required, "Correo o usuario"),
      ValidadorInput(emailOrUsernameValidator())
    ]),
    password: this.fb.control<string | null>("", [
      ValidadorInput(Validators.required, "Contraseña"),
      ValidadorInput(Validators.minLength(8))
    ]),
  });

  ngOnInit(): void {
    this.form.controls.email.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.emailOrUsernameIcon = (value && value.includes('@')) ? Mail : User;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.toastError("Ambos campos son requeridos.");
      return;
    }
    try {
      await this.authService.login(this.form.value);
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      this.alertService.error("Error de Autenticación", "El correo/usuario o la contraseña son incorrectos.");
    }
  }
}
