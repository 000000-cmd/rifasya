import { Component, Input, forwardRef, ElementRef, HostListener, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// 1. Nos aseguramos de importar el ícono ChevronDown
import { ChevronDown, LucideAngularModule, LucideIconData } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { BaseInputLabel } from '../input/label.component';
import { BaseSelectItemComponent } from './BaseSelectItem.component';

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
        <button
          type="button"
          (click)="toggle()"
          (blur)="markAsTouched()"
          [disabled]="disabled"
          class="cursor-pointer flex w-full items-center justify-between gap-2 rounded-md border
                 bg-white px-3 py-2 text-sm outline-none h-12
                 focus-visible:ring-2 focus-visible:ring-purple-500
                 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span class="truncate">{{ selectedLabel || placeholder }}</span>
          <!-- 3. Usamos la propiedad 'Chevron' con el binding [img] -->
          <lucide-angular
            [img]="Chevron"
            class="w-4 h-4 opacity-80 transition-transform duration-300 ease-in-out"
            [class.rotate-180]="isOpen"
          ></lucide-angular>
        </button>

        <div
          role="listbox"
          class="absolute mt-1 w-full rounded-md border bg-white shadow-md z-50 max-h-60 overflow-y-auto
                   transition-all duration-200 ease-out origin-top"
          [class.opacity-100]="isOpen"
          [class.scale-100]="isOpen"
          [class.opacity-0]="!isOpen"
          [class.scale-95]="!isOpen"
          [class.pointer-events-none]="!isOpen"
        >
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class BaseSelectComponent implements ControlValueAccessor, AfterContentInit {
  @Input() placeholder = 'Seleccione...';
  @Input() label = '';
  @Input() icon?: LucideIconData;

  // 2. Añadimos la propiedad para que el template pueda acceder al ícono
  readonly Chevron = ChevronDown;

  @ContentChildren(BaseSelectItemComponent) items!: QueryList<BaseSelectItemComponent>;

  isOpen = false;
  selectedLabel: string | null = null;
  disabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen) {
        this.markAsTouched();
      }
      this.isOpen = false;
    }
  }

  ngAfterContentInit(): void {
    this.items.forEach(item => {
      item.itemClicked.subscribe(() => {
        this.selectItem(item);
      });
    });
  }

  writeValue(value: any): void {
    setTimeout(() => {
      const selectedItem = this.items?.find(item => item.value === value);
      this.selectedLabel = selectedItem?.getLabel() || null;
      this.updateSelectedState(value);
    });
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  toggle(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.onTouched();
    }
  }

  selectItem(item: BaseSelectItemComponent): void {
    if (this.disabled) return;
    this.selectedLabel = item.getLabel();
    this.onChange(item.value);
    this.updateSelectedState(item.value);
    this.isOpen = false;
  }

  markAsTouched(): void {
    this.onTouched();
  }

  private updateSelectedState(value: any): void {
    this.items.forEach(item => {
      item.isSelected = item.value === value;
    });
  }
}
