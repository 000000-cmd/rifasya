import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';
import { BaseInputLabel } from '../../UI/input/label.component';

@Component({
  selector: 'native-base',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, CommonModule, BaseInputLabel],
  template: `
    <div class="relative flex flex-col gap-2">

      <label-input [label]="label" ></label-input>
      <select
        [value]="value"
        (change)="onChange($any($event.target).value)"
        (blur)="onTouched()"
        class="border-2 rounded-md p-2.5 w-full min-w-0
                bg-white/50 backdrop-blur-sm h-12
                transition-all duration-300 hover:bg-white
                focus:border-purple-500 focus:ring-2 focus:ring-purple-300 focus:outline-none"
        >
        <option *ngFor="let opt of options" [value]="opt.value">
          {{ opt.label }}
        </option>
      </select>

      <lucide-angular 
        name="chevron-down" 
        class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none">
      </lucide-angular>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NativeSelectComponent),
      multi: true,
    },
  ],
})
export class NativeSelectComponent implements ControlValueAccessor {
  @Input() options: { label: string; value: string }[] = [];
  @Input() label = '';
   @Input() icon = ChevronDown;
  // 👇 Aquí puedes ver lo que llega
  ngOnInit() {
    console.log('Options en OnInit:', this.options);
  }
    
  value: string = '';

  // Métodos de CVA
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
