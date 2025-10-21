import {Component, Input, Optional, Self} from '@angular/core';
import {NgClass} from '@angular/common';
import {BaseInputLabel} from './label.component';
import {LucideIconData} from 'lucide-angular';
import {AbstractControl, ControlValueAccessor, NgControl} from '@angular/forms';

@Component({
  selector: "false-input",
  imports: [
    NgClass,
    BaseInputLabel
  ],
  template: `
    <label-input
      [id]="id"
      [icon]="iconLabel"
      [label]="label"
      [control]="control"
      [tooltipText]="tooltipText">
    </label-input>
    <div class="mt-1 w-full p-2 border-2 rounded-md border-primary/50 text-black/60" [ngClass]="customClass">
      {{ text }}
    </div>`
})
export class FakeInputComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() label: string = '';
  @Input() iconLabel?: LucideIconData ;
  @Input() tooltipText?: string;
  @Input() text: string = '';
  @Input() customClass: string = '';

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(obj: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnChange(fn: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnTouched(fn: any): void {
        throw new Error('Method not implemented.');
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }

  get control(): AbstractControl | null {
    return this.ngControl?.control ?? null;
  }
}
