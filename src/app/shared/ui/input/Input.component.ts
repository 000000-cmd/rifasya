import { Component, Input, forwardRef, Optional, Self} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, FormGroupDirective, NgControl, FormsModule } from '@angular/forms';
import {BadgeAlert, BadgeCheck, LucideAngularModule, LucideIconData} from 'lucide-angular';
import {  NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BaseInputLabel } from './label.component'; 


@Component({
  selector: 'base-input',
  standalone: true,
  imports: [LucideAngularModule, NgxMaskDirective, FormsModule, BaseInputLabel],
    providers: [

  provideNgxMask ()
  ],
  template: `
  <div class="flex flex-col gap-2">
    <label-input [id]="id" [icon]="iconLabel" [label]="label"  [control]="control" >
    </label-input>

      <input
        [id]="id"
        [type]="type"
        [mask]="mask"
        [placeholder]="placeholder"
        [(ngModel)]="value"
        (input)="onChange($event.target.value)"
        (blur)="onTouched()"
        class="border-2 rounded-md p-2.5 w-full min-w-0
         bg-white/50 backdrop-blur-sm h-12
         transition-all duration-300 hover:bg-white
         focus:border-purple-500 focus:ring-2 focus:ring-purple-300 focus:outline-none"
        [class.border-red-500]="hasError"
        [class.border-green-500]="!hasError && control?.valid"
      />
    </div>
    @if (errorMessage) {
      <span class="text-red-600 text-sm">{{ errorMessage }}</span>
    }
  `

})
export class InputComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() type: string = 'text';
  @Input() placeholder = '';
  @Input() label: string = '';
  @Input() iconLabel?: LucideIconData ;
  @Input() mask? : string
  @Input() helperText? : String

  readonly validIcon = BadgeCheck;
  readonly invalidIcon = BadgeAlert;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this; // necesario para CVA
    }
  }

  get control(): AbstractControl | null {
    return this.ngControl?.control ?? null;
  }

  get showHelper(): boolean {
    return !!this.control && (this.control.touched);
  }

  get hasError(): boolean {
    return !!this.control?.invalid && (this.control?.touched || this.control?.dirty);
  }

  get errorMessage(): string | null {
    if (!this.control || !this.hasError) return null;

    // errores personalizados
    if (this.control.errors?.['customError']) return this.control.errors['customError'];

    // error de contraseñas no coinciden
    if (this.control.errors?.['passwordMismatch']) return 'Las contraseñas no coinciden';

    return null;
  }

  // Métodos inyectados por ControlValueAccesor

  value!: string;

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj ?? ''; // aquí sí asignas lo que venga del FormControl
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  validate(_: any) {
  return null; // puedes extender con reglas custom
  }
}
