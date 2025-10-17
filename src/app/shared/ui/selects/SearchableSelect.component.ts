import { Component, Input, forwardRef, ElementRef, HostListener, ChangeDetectorRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChevronDown, LucideAngularModule, LucideIconData } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { BaseInputLabel } from '../input/label.component';
import { ListItem } from '../../../core/models/TypeListItem.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-searchable-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, BaseInputLabel],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SearchableSelectComponent), multi: true }],
  styles: [` :host { display: block; } .dropdown-options { max-height: 200px; overflow-y: auto; } `],
  template: `
    <div class="w-full flex flex-col gap-2">
      <label-input [label]="label" [icon]="icon"></label-input>
      <div class="relative">
        <button type="button" (click)="toggle()" [disabled]="disabled"
                class="cursor-pointer flex w-full items-center justify-between gap-2 rounded-md border bg-white px-3 py-2 text-sm outline-none h-12 focus-visible:ring-2 focus-visible:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50">
          <span class="truncate">{{ selectedLabel || placeholder }}</span>
          <lucide-angular [img]="Chevron" class="w-4 h-4 opacity-80 transition-transform duration-300 ease-in-out"
                          [class.rotate-180]="isOpen"></lucide-angular>
        </button>
        <div role="listbox"
             class="absolute mt-1 w-full rounded-md border bg-white shadow-md z-50 transition-all duration-200 ease-out origin-top"
             [class.opacity-100]="isOpen" [class.scale-100]="isOpen" [class.opacity-0]="!isOpen"
             [class.scale-95]="!isOpen" [class.pointer-events-none]="!isOpen">
          <div class="p-2 border-b">
            <input type="text" [formControl]="searchControl" placeholder="Buscar..."
                   (click)="$event.stopPropagation()"
                   class="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500">
          </div>
          <div class="max-h-52 overflow-y-auto">
            @for (option of filteredOptions; track option.code) {
              <div (click)="selectItem(option)" class="flex items-center gap-2 cursor-pointer px-2 py-3 text-sm hover:bg-purple-100" [class.font-semibold]="option.code === selectedId">
                {{ option.name }}
              </div>
            } @empty {
              <div class="px-2 py-3 text-sm text-gray-500">No se encontraron opciones</div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class SearchableSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() options: ListItem[] = [];
  @Input() placeholder = 'Seleccione...';
  @Input() label = '';
  @Input() icon?: LucideIconData;
  @Input() selectedId: string | null = null;
  @Input() disabled: boolean = false;
  @Output() selectionChange = new EventEmitter<ListItem>();

  readonly Chevron = ChevronDown;
  isOpen = false;
  selectedLabel: string | null = null;
  searchControl = new FormControl('');
  filteredOptions: ListItem[] = [];

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    this.searchControl.valueChanges.pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(searchTerm => this.filterOptions(searchTerm || ''));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.filterOptions('');
      this.updateSelectedLabel();
    }
    if (changes['selectedId']) {
      this.updateSelectedLabel();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  writeValue(value: any): void {
    this.selectedId = value;
    this.updateSelectedLabel();
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; this.cdr.detectChanges(); }

  toggle(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.onTouched();
        this.searchControl.setValue('', { emitEvent: false });
        this.filterOptions('');
      }
    }
  }

  selectItem(option: ListItem): void {
    if (!this.disabled) {
      this.selectedId = option.code;
      this.selectedLabel = option.name;
      this.onChange(this.selectedId);
      this.selectionChange.emit(option);
      this.isOpen = false;
    }
  }

  private updateSelectedLabel(): void {
    if (this.options && this.options.length > 0 && this.selectedId) {
      this.selectedLabel = this.options.find(option => option.code === this.selectedId)?.name ?? null;
    } else {
      this.selectedLabel = null;
    }
    this.cdr.detectChanges();
  }

  private filterOptions(searchTerm: string): void {
    this.filteredOptions = this.options.filter(option => option.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
