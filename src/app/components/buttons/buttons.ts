import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-primary-button',
  template: `
    <button [ngClass]="class">{{ text }}</button>
  `,
  imports: [NgClass],
  styleUrls: ['./primaryButton.component.css']
})
export class PrimaryButton {
  @Input() text = '';
  @Input() class = 'bg-primary hover:bg-primary-foreground text-white text-lg px-8 py-3 rounded-lg font-semibold transition-colors';
}

@Component({
  selector: 'app-secondary-button',
  template: `
    <button [ngClass]="class">{{ text }}</button>
  `,
  imports: [NgClass],
  styleUrls: ['./secondaryButton.component.css']
})
export class SecondaryButton {
  @Input() text = '';
  @Input() class = 'border-2 border-purple-200 text-purple-600 hover:bg-purple-50 text-lg px-8 py-3 rounded-lg font-semibold transition-colors';
}


