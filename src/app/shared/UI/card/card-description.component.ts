import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: '[card-description]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p data-slot="card-description" [ngClass]="'text-muted-foreground ' + className">
      <ng-content></ng-content>
    </p>
  `
})
export class CardDescriptionComponent {
  @Input() className = '';
}
