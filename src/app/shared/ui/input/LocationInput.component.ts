import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Injector,
  ChangeDetectorRef,
  DoCheck
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { BaseInputLabel } from './label.component';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-location-input',
  standalone: true,
  imports: [CommonModule, BaseInputLabel, LucideAngularModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LocationInputComponent), multi: true }],
  template: `
    <div>
      <label-input
        [id]="id"
        [icon]="iconLabel"
        [label]="label"
        [control]="control"
        [tooltipText]="dynamicTooltipText"
        [tooltipVariant]="dynamicTooltipVariant">
      </label-input>
      <div (click)="openModal.emit()"
           class="w-full h-12 flex items-center px-2.5 bg-white/50 backdrop-blur-sm border-2 rounded-md cursor-pointer
                  transition-all duration-300 hover:bg-white"
           [class.border-red-500]="hasError"
           [class.border-green-500]="!hasError && control?.valid && (control?.touched || control?.dirty)">
        <span class="text-gray-700 truncate">{{ displayValue }}</span>
      </div>

      @if (errorMessage) {
        <span class="text-red-600 text-sm mt-1">{{ errorMessage }}</span>
      }
    </div>
  `
})
export class LocationInputComponent implements ControlValueAccessor, OnInit, DoCheck {
  @Input() id: string = '';
  @Input() iconLabel?: LucideIconData;
  @Input() label: string = 'Ubicación';
  @Input() defaultTooltipText: string = 'Selecciona tu ubicación completa.';
  @Output() openModal = new EventEmitter<void>();

  displayValue: string = 'Seleccionar ubicación...';
  ngControl: NgControl | null = null;
  private _lastErrorState: string | null = null;

  constructor(
    private injector: Injector,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // FIX: ngDoCheck se ejecuta en cada ciclo de detección de cambios de Angular.
  // Es la forma más robusta de comprobar manualmente si el estado del error ha cambiado.
  ngDoCheck(): void {
    const errorMsg = this.errorMessage;
    // Si el mensaje de error actual es diferente al último que guardamos,
    // forzamos la actualización de la vista.
    if (errorMsg !== this._lastErrorState) {
      this._lastErrorState = errorMsg;
      this.cdr.markForCheck();
    }
  }

  // --- GETTERS PARA GESTIONAR ERRORES Y TOOLTIPS ---
  get control(): AbstractControl | null {
    return this.ngControl?.control ?? null;
  }

  get hasError(): boolean {
    return !!this.control?.invalid && (this.control?.touched || this.control?.dirty);
  }

  get errorMessage(): string | null {
    if (this.hasError && this.control?.errors?.['customError']) {
      return this.control.errors['customError'];
    }
    return null;
  }

  get dynamicTooltipText(): string {
    const control = this.control;
    if (control?.hasError('locationIncomplete') && control.errors?.['missing']) {
      const missingFields = control.errors['missing'];
      return 'Faltan campos:<br>' + missingFields.map((field: any) => `&bull; ${field}`).join('<br>');
    }
    return this.defaultTooltipText;
  }

  get dynamicTooltipVariant(): 'error' | 'info' {
    if (this.hasError) {
      return 'error';
    }
    return 'info';
  }

  // --- LÓGICA DE CONTROLVALUEACCESSOR ---
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(obj: any): void {
    if (obj) { this.formatDisplayValue(obj); }
    else { this.displayValue = 'Seleccionar ubicación...'; }
  }

  private formatDisplayValue(data: any): void {
    if (!data?.countryName) { this.displayValue = 'Seleccionar ubicación...'; return; }
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
