// structured-address.component.ts

import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseSelectComponent} from './selects/BaseSelectComponent.component';
import { ListItem} from '../../core/models/TypeListItem.model';

@Component({
  selector: 'app-structured-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaseSelectComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StructuredAddressComponent),
      multi: true
    }
  ],
  template: `
    <div [formGroup]="addressForm">
      <label class="block text-sm font-medium text-gray-700 mt-2">Dirección</label>
      <div class="mt-1 flex flex-wrap gap-2 items-center">
        <div class="flex-shrink-0">
          <base-select formControlName="viaType" [options]="viaTypes"></base-select>
        </div>
        <input type="text" formControlName="viaNumber" placeholder="78b" class="w-20 border-gray-300 rounded-md shadow-sm h-12 py-2 px-3">
        <span class="font-bold text-gray-500">#</span>
        <input type="text" formControlName="crossStreetNumber" placeholder="32a" class="w-20 border-gray-300 rounded-md shadow-sm h-12 py-2 px-3">
        <span class="font-bold text-gray-500">-</span>
        <input type="text" formControlName="houseNumber" placeholder="01" class="w-16 border-gray-300 rounded-md shadow-sm h-12 py-2 px-3">
      </div>
    </div>
  `
})
export class StructuredAddressComponent implements ControlValueAccessor {
  addressForm: FormGroup;
  private sub: Subscription | null = null;

  // Lista de opciones para el BaseSelect
  viaTypes: ListItem[] = [
    { code: 'Calle', name: 'Calle', order: 1 },
    { code: 'Carrera', name: 'Carrera', order: 2 },
    { code: 'Avenida', name: 'Avenida', order: 3 },
    { code: 'Transversal', name: 'Transversal', order: 4 },
    { code: 'Diagonal', name: 'Diagonal', order: 5 },
  ];

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      viaType: ['Calle'],
      viaNumber: [''],
      crossStreetNumber: [''],
      houseNumber: ['']
    });
  }

  writeValue(value: any): void {
    if (value) { this.addressForm.setValue(value, { emitEvent: false }); }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.sub?.unsubscribe();
    this.sub = this.addressForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.addressForm.disable() : this.addressForm.enable();
  }
}
