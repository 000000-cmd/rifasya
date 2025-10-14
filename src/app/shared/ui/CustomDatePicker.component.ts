import { Component, Input, forwardRef, HostListener, ElementRef, Optional, Self, OnInit, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, NgControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Calendar, ChevronLeft, ChevronRight } from 'lucide-angular';
import { BaseInputLabel} from './input/label.component';

@Component({
  selector: 'custom-datepicker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, BaseInputLabel],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatepickerComponent),
      multi: true
    }
  ],
  styles: [`
    .datepicker-panel {
      position: absolute;
      /* FIX: Corregido el cálculo del 'top' para un posicionamiento preciso */
      top: 100%;
      margin-top: 0.5rem; /* 8px de separación */
      width: 100%;
      background-color: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      padding: 1rem;
      z-index: 20;
      transition: opacity 0.2s ease-out, transform 0.2s ease-out;
      transform-origin: top center;
    }
    .datepicker-panel-hidden {
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
      pointer-events: none;
    }
  `],
  template: `
    <div class="relative w-full">
      <div class="flex flex-col gap-2">
        <label-input
          [label]="label"
          [icon]="Calendar"
          [control]="control">
        </label-input>

        <div (click)="toggleCalendar()"
             class="w-full h-12 flex items-center justify-between px-2.5 gap-2 bg-white/50 backdrop-blur-sm border-2 rounded-md cursor-pointer
                    transition-all duration-300 hover:bg-white"
             [class.border-red-500]="hasError"
             [class.border-green-500]="!hasError && control?.valid && (control?.touched || control?.dirty)"
             [class.border-purple-600]="isOpen"
             [class.ring-2]="isOpen"
             [class.ring-purple-300]="isOpen">

          <lucide-angular [img]="Calendar" class="w-5 h-5 text-gray-400"></lucide-angular>
          <span class="flex-grow text-left" [ngClass]="displayValue ? 'text-gray-800' : 'text-gray-400'">
            {{ displayValue || 'dd/mm/aaaa' }}
          </span>
          <lucide-angular [img]="Calendar" class="w-5 h-5 text-gray-400"></lucide-angular>
        </div>
      </div>

      <div class="datepicker-panel" [class.datepicker-panel-hidden]="!isOpen">
        <div class="flex items-center justify-between mb-4">
          <button (click)="navigate(-1)" type="button" class="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <lucide-angular [img]="ChevronLeft" class="w-5 h-5"></lucide-angular>
          </button>
          <div class="flex gap-2">
            @if (currentView !== 'years') {
              <button (click)="setView('months')" type="button" class="font-bold text-gray-800 p-1 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">{{ monthNames[currentMonth] }}</button>
            }
            <button (click)="setView('years')" type="button" class="font-bold text-gray-800 p-1 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">{{ currentYear }}</button>
          </div>
          <button (click)="navigate(1)" type="button" class="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <lucide-angular [img]="ChevronRight" class="w-5 h-5"></lucide-angular>
          </button>
        </div>
        @switch (currentView) {
          @case ('days') {
            <div class="grid grid-cols-7 gap-1 text-center">
              @for (day of daysOfWeek; track day) { <div class="text-xs font-bold text-gray-500">{{ day }}</div> }
              @for (day of calendarDays; track $index) {
                <div (click)="selectDate(day)"
                     class="p-2 rounded-full text-sm cursor-pointer transition-colors"
                     [ngClass]="{'bg-purple-600 text-white hover:bg-purple-700': isSelected(day), 'hover:bg-gray-100': day && !isSelected(day), 'text-gray-800': day, 'cursor-default': !day}">
                  {{ day }}
                </div>
              }
            </div>
          }
          @case ('months') {
            <div class="grid grid-cols-3 gap-2">
              @for (month of monthNames; track month; let i = $index) {
                <div (click)="selectMonth(i); $event.stopPropagation()" class="p-3 rounded-lg text-sm text-center font-semibold cursor-pointer transition-colors" [ngClass]="i === currentMonth ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'">
                  {{ month.substring(0, 3) }}
                </div>
              }
            </div>
          }
          @case ('years') {
            <div class="grid grid-cols-3 gap-2">
              @for (year of yearRange; track year) {
                <div (click)="selectYear(year); $event.stopPropagation()" class="p-3 rounded-lg text-sm text-center font-semibold cursor-pointer transition-colors" [ngClass]="year === currentYear ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'">
                  {{ year }}
                </div>
              }
            </div>
          }
        }
      </div>

       @if (errorMessage) {
        <span class="text-red-600 text-sm mt-2">{{ errorMessage }}</span>
      }
    </div>
  `
})
export class CustomDatepickerComponent implements ControlValueAccessor, OnInit {
  readonly Calendar = Calendar;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  @Input() label: string = '';
  isOpen = false;
  displayValue: string = '';
  selectedDate: Date | null = null;
  currentView: 'days' | 'months' | 'years' = 'days';
  currentMonth: number;
  currentYear: number;
  yearRange: number[] = [];
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  daysOfWeek = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
  calendarDays: (number | null)[] = [];
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  ngControl: NgControl | null = null;

  constructor(
    private elementRef: ElementRef,
    private injector: Injector
  ) {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.generateCalendar();
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get control(): AbstractControl | null {
    return this.ngControl?.control ?? null;
  }

  get hasError(): boolean {
    return !!this.control?.invalid && (this.control?.touched || this.control?.dirty);
  }

  get errorMessage(): string | null {
    if (this.hasError && this.control?.errors && this.control.errors['customError']) {
      return this.control.errors['customError'];
    }
    return null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.onTouched();
      this.toggleCalendar();
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      this.selectedDate = new Date(obj);
      this.displayValue = this.formatDate(this.selectedDate);
      this.currentYear = this.selectedDate.getFullYear();
      this.currentMonth = this.selectedDate.getMonth();
      this.generateCalendar();
    }
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  generateCalendar(): void {
    this.calendarDays = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    for (let i = 0; i < firstDayOfMonth; i++) { this.calendarDays.push(null); }
    for (let i = 1; i <= daysInMonth; i++) { this.calendarDays.push(i); }
  }

  generateYearRange(): void {
    this.yearRange = [];
    const startYear = this.currentYear - 6;
    for (let i = 0; i < 12; i++) { this.yearRange.push(startYear + i); }
  }

  setView(view: 'days' | 'months' | 'years'): void {
    if (view === 'years') { this.generateYearRange(); }
    this.currentView = view;
  }

  selectMonth(monthIndex: number): void {
    this.currentMonth = monthIndex;
    this.generateCalendar();
    this.setView('days');
  }

  selectYear(year: number): void {
    this.currentYear = year;
    this.setView('months');
  }

  selectDate(day: number | null): void {
    if (!day) return;
    this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
    this.displayValue = this.formatDate(this.selectedDate);
    const modelValue = this.selectedDate.toISOString().split('T')[0];
    this.onChange(modelValue);
    this.onTouched();
    this.isOpen = false;
  }

  navigate(direction: number): void {
    switch (this.currentView) {
      case 'days':
        this.currentMonth += direction;
        if (this.currentMonth < 0) { this.currentMonth = 11; this.currentYear--; }
        else if (this.currentMonth > 11) { this.currentMonth = 0; this.currentYear++; }
        this.generateCalendar();
        break;
      case 'months':
        this.currentYear += direction;
        break;
      case 'years':
        this.currentYear += (direction * 12);
        this.generateYearRange();
        break;
    }
  }

  toggleCalendar(): void {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      setTimeout(() => this.setView('days'), 200);
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  isSelected(day: number | null): boolean {
    if (!day || !this.selectedDate) return false;
    return day === this.selectedDate.getDate() &&
      this.currentMonth === this.selectedDate.getMonth() &&
      this.currentYear === this.selectedDate.getFullYear();
  }
}
