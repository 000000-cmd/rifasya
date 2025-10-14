import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-location-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocationInputComponent),
      multi: true
    }
  ],
  template: `
    <div>
      <label class="block text-sm font-bold text-gray-700 mb-2">{{ label }}</label>
      <div (click)="openModal.emit()"
           class="w-full h-12 flex items-center px-2.5 bg-white/50 backdrop-blur-sm border-2 rounded-md cursor-pointer
                  transition-all duration-300 hover:bg-white focus:border-purple-500">
        <span class="text-gray-700 truncate">{{ displayValue }}</span>
      </div>
    </div>
  `
})
export class LocationInputComponent implements ControlValueAccessor {
  @Input() label: string = 'Ubicación';
  @Output() openModal = new EventEmitter<void>();

  displayValue: string = 'Seleccionar ubicación...';

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(obj: any): void {
    if (obj) {
      this.formatDisplayValue(obj);
    } else {
      this.displayValue = 'Seleccionar ubicación...';
    }
  }

  public updateValue(locationData: any) {
    this.onChange(locationData);
    this.formatDisplayValue(locationData);
    this.onTouched();
  }

  private formatDisplayValue(data: any): void {
    if (!data?.countryName) {
      this.displayValue = 'Seleccionar ubicación...';
      return;
    }

    const addressObj = data.address;
    const fullAddress = addressObj?.viaType && addressObj?.viaNumber ?
      `${addressObj.viaType} ${addressObj.viaNumber} # ${addressObj.crossStreetNumber} - ${addressObj.houseNumber}`
      : '';

    const parts = [fullAddress, data.neighborhoodName, data.municipalityName, data.departmentName, data.countryName];
    this.displayValue = parts.filter(p => p).join(', ');
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}
