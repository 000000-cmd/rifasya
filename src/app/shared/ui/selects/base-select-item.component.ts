import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { BaseSelectComponent } from './base-select.component'; 

export interface SelectOption {
  value: any;
  label: string;
}

@Component({
  selector: 'base-select-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div
      (click)="selectThis()"
      class="flex items-center gap-2 cursor-pointer px-2 py-1.5 text-sm hover:bg-purple-100"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class BaseSelectItemComponent {
  @Input() value: any = '';
  @Input() label = ''; // opcional si quieres usarlo

  constructor(public parent: BaseSelectComponent) {}

  selectThis() {
    const option: SelectOption = {
      value: this.value,
      label: this.label || String(this.value), // fallback si no se pasa label
    };
    this.parent.selectOption(option);
  }
}
