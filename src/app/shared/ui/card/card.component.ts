import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      data-slot="card"
      [ngClass]="
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border ' + className
      "
    >
      <ng-content select="[card-header]"></ng-content>
      <ng-content select="[card-content]"></ng-content>
      <ng-content select="[card-footer]"></ng-content>
    </div>
  `
})
export class CardComponent {
  @Input() className = '';
}
