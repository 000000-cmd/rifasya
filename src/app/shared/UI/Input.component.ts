import { Component, Input, forwardRef, Optional, Self} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, FormGroupDirective, NgControl } from '@angular/forms';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import {  NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'base-input',
  standalone: true,
  imports: [LucideAngularModule, NgxMaskDirective ],
    providers: [
 
  provideNgxMask () 
  ],
  template: `
  <div class= "space-y-2"> 
    <label [for]="id" class="flex items-center gap-2 font-bold text-gray-700">
        <lucide-angular  [img]="iconLabel" name="user" class="w-4 h-4 mr-2 text-purple-600"></lucide-angular>
        {{ label }}
    </label>

    <input
      [id]="id"
      [type]="type"
      [mask]="mask"
      [placeholder]="placeholder"
      [value]="value"
      (input)="onChange($event.target.value)"
      (blur)="onTouched()"
      class="border-2 rounded-md p-2.5 w-full min-w-0 focus:border-purple-500 bg-white/50 backdrop-blur-sm h-12 
             transition-all duration-300 hover:bg-white focus:bg-white"
      [class.border-red-500]="hasError"
      [class.border-purple-100]="!hasError"
    />
    </div>
      @if (control?.errors?.['customError'] && (control?.touched || control?.dirty)) {
        <span class="text-red-600">{{ control?.errors?.['customError'] }}</span>
      }
  `

})
export class InputComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() type: string = 'text';
  @Input() placeholder = '';
  @Input() hasError = false;
  @Input() label: string = '';
  @Input() iconLabel?: LucideIconData ;
  @Input() mask? : string
  @Input() helperText? : String

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
