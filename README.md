# Rifasya

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## 🧾 Tips: Formularios

✅ **Recuerde usar la función `ValidadorInput`** al momento de aplicar validaciones a los campos del formulario.

⚙️ **Importe el módulo `ReactiveFormsModule`** en el componente (o módulo) donde se encuentra la vista para garantizar el correcto funcionamiento de las validaciones.

---

### 💡 Ejemplo rápido

```ts
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'login',
    standalone: true,
    imports: [InputComponent, PrimaryButton, ButtonComponent, ReactiveFormsModule],
    templateUrl:'./Login.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: this.fb.control('', [
      ValidadorInput(Validators.required, 'Correo'),
      ValidadorInput(Validators.email)
    ]),
    password: this.fb.control('', [
      ValidadorInput(Validators.required, 'Contraseña'),
      ValidadorInput(Validators.minLength(8))
    ])
  }, { validators: passwordMatchValidator });
}
```

### 💡 TODO

* **Vista de Login con validaciones basicas completas. Toca proceder con conexiones a la API.**
* **Se plantea usar [ButtonComponent](src/app/shared/ui/buttons/button/button.component.ts) como componente maestro de los botones. En caso de no ser viable continuar con componentes de botones especificos.**
