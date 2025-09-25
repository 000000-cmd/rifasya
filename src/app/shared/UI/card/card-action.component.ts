import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: '[card-action]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      data-slot="card-action"
      [ngClass]="'col-start-2 row-span-2 row-start-1 self-start justify-self-end ' + className"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class CardActionComponent {
  @Input() className = '';
}
