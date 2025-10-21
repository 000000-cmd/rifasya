import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    @if (isOpen) {
      <div (click)="close.emit()" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"></div>
    }

    <div
      class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50"
      [class.translate-x-0]="isOpen"
      [class.translate-x-full]="!isOpen">

      <div class="p-6 h-full flex flex-col">
        <div class="flex justify-between items-center border-b pb-4">
          <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
          <button (click)="close.emit()" class="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <lucide-angular [img]="X" class="w-5 h-5"></lucide-angular>
          </button>
        </div>

        <div class="mt-6 flex-grow overflow-y-auto pr-2">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class DrawerComponent {
  @Input() isOpen = false;
  @Input() title = 'Formulario';
  @Output() close = new EventEmitter<void>();

  readonly X = X;
}
