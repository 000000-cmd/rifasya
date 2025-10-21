import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import {ButtonComponent} from './button/button.component';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [LucideAngularModule, ButtonComponent],
  template: `
    <app-button variant="neutral" type="button" (click)="goBack()" class="flex">
      <lucide-angular [img]="ArrowLeft" class="w-4 h-4 self-center mr-2"></lucide-angular>
      Regresar
    </app-button>
  `
})
export class BackButtonComponent {
  readonly ArrowLeft = ArrowLeft;
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
