import { Component, Input, forwardRef, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChevronDown, LucideAngularModule, LucideIconData } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { BaseInputLabel } from '../input/label.component';
import {ListItem} from '../../../core/models/TypeListItem.model';

@Component({
  selector: 'base-select',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, BaseInputLabel],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseSelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="w-full flex flex-col gap-2">
      <label-input [label]="label" [icon]="icon"></label-input>
      <div class="relative">
        <button type="button" (click)="toggle()" (blur)="onTouched()" [disabled]="disabled"
                class="cursor-pointer flex w-full items-center justify-between gap-2 rounded-md border bg-white px-3 py-2 text-sm outline-none h-12 focus-visible:ring-2 focus-visible:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50">
          <span class="truncate">{{ selectedLabel || placeholder }}</span>
          <lucide-angular [img]="Chevron" class="w-4 h-4 opacity-80 transition-transform duration-300 ease-in-out" [class.rotate-180]="isOpen"></lucide-angular>
        </button>
        <div role="listbox"
             class="absolute mt-1 w-full rounded-md border bg-white shadow-md z-50 max-h-60 overflow-y-auto transition-all duration-200 ease-out origin-top"
             [class.opacity-100]="isOpen" [class.scale-100]="isOpen"
             [class.opacity-0]="!isOpen" [class.scale-95]="!isOpen"
             [class.pointer-events-none]="!isOpen">
          @for (option of options; track option.code) {
            <div (click)="selectItem(option)" class="flex items-center gap-2 cursor-pointer px-2 py-3 text-sm hover:bg-purple-100" [class.font-semibold]="option.code === _value">
              {{ option.name }}
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class BaseSelectComponent implements ControlValueAccessor {
  @Input() options: ListItem[] = [];
  @Input() placeholder = 'Seleccione...';
  @Input() label = '';
  @Input() icon?: LucideIconData;

  readonly Chevron = ChevronDown;
  isOpen = false;
  selectedLabel: string | null = null;
  _value: any;
  disabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  writeValue(value: any): void {
    this._value = value;
    this.updateSelectedLabel();
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.detectChanges(); // Notifica a la vista sobre el cambio en 'disabled'
  }

  toggle(): void {
    if (!this.disabled) this.isOpen = !this.isOpen;
  }

  selectItem(option: ListItem): void {
    if (!this.disabled) {
      this._value = option.code;
      this.selectedLabel = option.name;
      this.onChange(this._value);
      this.onTouched();
      this.isOpen = false;
    }
  }

  private updateSelectedLabel(): void {
    const selectedItem = this.options.find(option => option.code === this._value);
    this.selectedLabel = selectedItem ? selectedItem.name : null;
    this.cdr.detectChanges();
  }
}

