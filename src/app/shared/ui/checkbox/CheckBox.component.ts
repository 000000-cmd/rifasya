import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Check } from 'lucide-angular';

@Component({
  selector: 'app-custom-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <label class="flex items-start space-x-3 cursor-pointer group">
      <!-- Input real, oculto visualmente pero funcional para accesibilidad y formularios -->
      <input
        type="checkbox"
        class="sr-only"
        [checked]="checked"
        [disabled]="disabled"
        (change)="toggle()"
      />

      <!-- Checkbox personalizado (la parte visual) -->
      <div
        class="w-5 h-5 mt-0.5 flex-shrink-0 rounded-md border-2 flex items-center justify-center transition-all duration-200 ease-in-out
               group-hover:border-purple-400"
        [class.bg-gradient-to-br]="checked"
        [class.from-purple-600]="checked"
        [class.to-pink-500]="checked"
        [class.border-purple-600]="checked"
        [class.border-gray-300]="!checked"
        [class.bg-gray-200]="disabled"
        [class.border-gray-200]="disabled"
      >
        <!-- El ícono de 'check' que aparece y desaparece con una transición -->
        @if (checked) {
          <lucide-angular
            [img]="CheckIcon"
            class="w-4 h-4 text-white transition-opacity duration-200"
          ></lucide-angular>
        }
      </div>

      <!-- El texto del label, que puede incluir HTML como links -->
      <span class="text-gray-700 leading-relaxed select-none">
        <ng-content></ng-content>
      </span>
    </label>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  readonly CheckIcon = Check;
  checked = false;
  disabled = false;

  onChange = (value: boolean) => {};
  onTouched = () => {};

  writeValue(value: boolean): void {
    this.checked = !!value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChange(this.checked);
      this.onTouched();
    }
  }
}
