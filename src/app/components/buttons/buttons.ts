import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-primary-button',
  template: `
    <button [ngClass]="buttonClass">{{ text }}</button>
  `,
  imports: [NgClass],
  styleUrls: ['./primaryButton.component.css'],
  standalone: true
})
export class PrimaryButton {
  private type1 = 'bg-primary hover:bg-primary-foreground text-white text-lg px-8 py-3 rounded-lg font-semibold transition-colors';
  private type2 = 'w-full bg-[var(--primary-color)] hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-md font-semibold transition-colors';

  @Input() text = '';
  @Input() type: 'type1' | 'type2' = 'type1'; // solo admite "type1" o "type2"

  get buttonClass(): string {
    return this.type === 'type1' ? this.type1 : this.type2;
  }
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


