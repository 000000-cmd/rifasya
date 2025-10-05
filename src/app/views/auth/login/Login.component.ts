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

  // 3. Variable que guardará el ícono a mostrar (inicia con el de usuario)
  emailOrUsernameIcon: LucideIconData = User;

  // 4. Subject para manejar la desuscripción y evitar fugas de memoria
  private unsubscribe$ = new Subject<void>();

  private fb = inject(FormBuilder);

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
    // 5. Escuchamos los cambios en el campo 'email'
    this.form.controls.email.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        // Si el texto incluye un '@', es probable que sea un correo
        if (value && value.includes('@')) {
          this.emailOrUsernameIcon = Mail;
        } else {
          this.emailOrUsernameIcon = User;
        }
      });
  }

  ngOnDestroy(): void {
    // 6. Limpiamos la subscripción cuando el componente se destruye
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('✅ Datos del formulario:', this.form.value);
      alert("¡Inicio de sesión exitoso! (Esto es una demo)");
    } else {
      console.warn("⚠️ Errores en el formulario:", this.form.errors);
      this.form.markAllAsTouched();
    }
  }
}
