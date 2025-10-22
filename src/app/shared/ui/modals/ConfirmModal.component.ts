import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent} from '../buttons/button/button.component';
import { LucideAngularModule, LoaderCircle, AlertTriangle } from 'lucide-angular';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
  template: `
    <div class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fade-in-fast">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md text-center transform animate-slide-in-down" (click)="$event.stopPropagation()">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
          <lucide-angular [img]="AlertTriangle" class="h-6 w-6 text-yellow-600"></lucide-angular>
        </div>
        <h3 class="mt-4 text-xl font-bold text-gray-900">{{ title }}</h3>
        <p class="mt-2 text-sm text-gray-500">{{ message }}</p>
        <div class="mt-6 flex justify-center gap-4">
          <app-button variant="outline" (click)="resolve(false)">{{ cancelButtonText }}</app-button>
          <app-button variant="destructive" (click)="resolve(true)">{{ confirmButtonText }}</app-button>
        </div>
      </div>
    </div>
  `
})
export class ConfirmModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';

  @Input() confirmButtonText: string = 'Sí, confirmo';
  @Input() cancelButtonText: string = 'Cancelar';

  @Output() result = new EventEmitter<boolean>();

  readonly AlertTriangle = AlertTriangle;
  readonly LoaderCircle = LoaderCircle;

  resolve(value: boolean): void {
    this.result.emit(value);
  }
}
