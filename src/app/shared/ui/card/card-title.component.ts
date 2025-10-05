import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: '[card-title]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h4 data-slot="card-title" [ngClass]="'leading-none ' + className">
      <ng-content></ng-content>
    </h4>
  `
})
export class CardTitleComponent {
  @Input() className = '';
}
