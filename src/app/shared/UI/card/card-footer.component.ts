import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: '[card-footer]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      data-slot="card-footer"
      [ngClass]="'flex items-center px-6 pb-6 [.border-t]:pt-6 ' + className"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class CardFooterComponent {
  @Input() className = '';
}
