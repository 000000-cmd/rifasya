import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { BaseInputLabel } from '../input/label.component';

interface SelectOption {
  value: any;
  label: string;
}

@Component({
  selector: 'base-select',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, BaseInputLabel],
  template: `
  <div class="w-full  flex flex-col gap-2">
    <!-- Trigger -->
    <label-input [label]="label" ></label-input>
    <div class="relative">
      <button
        type="button"
        (click)="toggle()"
        (focus)="isFocused = true"
        (blur)="markAsTouched()"
        [ngClass]="{
          'ring-2 ring-purple-500': isFocused,
          'bg-gray-100': !isFocused
        }"
        class="flex w-full items-center justify-between gap-2 rounded-md border
            bg-white px-3 py-2 text-sm outline-none h-12
              focus-visible:ring-2 focus-visible:ring-purple-500
              disabled:cursor-not-allowed disabled:opacity-50
              data-[size=default]:h-9 data-[size=sm]:h-8"
      >
      <span class="truncate">{{ value || placeholder }}</span>
      <lucide-angular [name]="icon" class="w-4 h-4 opacity-80"></lucide-angular>
    </button>

    <!-- Content -->
    @if (isOpen) {
      <div class="absolute mt-1 w-full rounded-md border bg-white shadow-md z-50 max-h-60 overflow-y-auto">
        <ng-content></ng-content>
      </div>
    }
  </div>
</div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseSelectComponent),
      multi: true,
    },
  ],
})
export class BaseSelectComponent implements ControlValueAccessor {
  @Input() placeholder = 'Seleccione...';
  @Input() size: 'sm' | 'default' = 'default';
  @Input() label = '';
  @Input() icon = ChevronDown;

  isOpen = false;
  value: any;
  isFocused = false;
  disabled = false;

  

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
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

  toggle() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
  }

  selectOption(option: SelectOption) {
    if (this.disabled) return;

    this.value = option.value;   // o el objeto entero si lo necesitas
    this.onChange(option.value); // o `option` si quieres mandar todo
    this.onTouched();            // dispara touched
    this.isOpen = false;
  }

  markAsTouched() {
    this.onTouched();
    this.isFocused = false;
  }
}

