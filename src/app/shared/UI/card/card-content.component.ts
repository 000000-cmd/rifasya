import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: '[card-content]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div data-slot="card-content" [ngClass]="'px-6 [&:last-child]:pb-6 ' + className">
      <ng-content></ng-content>
    </div>
  `
})
export class CardContentComponent {
  @Input() className = '';
}
