import { Component, Input, forwardRef, Optional, Self} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, FormGroupDirective, NgControl } from '@angular/forms';
import {BadgeAlert, BadgeCheck, LucideAngularModule, LucideIconData} from 'lucide-angular';
import {  NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {NgClass} from '@angular/common';

@Component({
  selector: 'base-input',
  standalone: true,
  imports: [LucideAngularModule, NgxMaskDirective, NgClass],
    providers: [

  provideNgxMask ()
  ],
  template: `
    <div class="space-y-2">
      <label [for]="id" class="flex items-center gap-2 font-bold text-gray-700">
        <lucide-angular [img]="iconLabel" name="user" class="w-4 h-4 mr-2 text-purple-600"></lucide-angular>
        {{ label }}
        @if (control?.touched || control?.dirty) {
          <lucide-angular
            [img]="hasError ? invalidIcon : validIcon"
            class="w-4 h-4 mr-2"
            [ngClass]="hasError ? 'text-red-500' : 'text-green-600'">
          </lucide-angular>
        }
      </label>

      <input
        [id]="id"
        [type]="type"
        [mask]="mask"
        [placeholder]="placeholder"
        [value]="value"
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

  value: string = '';

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
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
