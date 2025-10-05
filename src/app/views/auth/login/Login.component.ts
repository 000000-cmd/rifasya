import { Component, inject } from "@angular/core";
import { Cpu, KeyIcon, KeyRound, User } from "lucide-angular";
import { InputComponent } from "../../../shared/ui/input/Input.component";
import { PrimaryButton } from "../../../shared/ui/buttons/buttons.component";
import { ButtonComponent } from "../../../shared/ui/buttons/button/button.component";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ValidadorInput } from "../../../shared/utils/validarInput";
import { passwordMatchValidator } from "../../../shared/utils/validatePassword";


@Component({
    selector: 'login',
    standalone: true,
    imports: [InputComponent, PrimaryButton, ButtonComponent, ReactiveFormsModule],
    templateUrl:'./Login.html'
})

export class Login {
    /*Icons */
    readonly User = User;
    readonly Key = KeyRound;

    private fb = inject(FormBuilder);

    form = this.fb.group({
        email: this.fb.control<String | null>("",[
            ValidadorInput(Validators.required, "Correo"),
            ValidadorInput(Validators.email)
        ]),
        password: this.fb.control<string | null>("", [
            ValidadorInput(Validators.required, "Contraseña"),
            ValidadorInput(Validators.minLength(8))
        ]),
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