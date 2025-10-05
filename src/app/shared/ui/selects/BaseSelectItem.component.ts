import { Component, Input, HostBinding, ElementRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'base-select-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      (click)="onClick()"
      class="flex items-center gap-2 cursor-pointer px-2 py-3 text-sm outline-none hover:bg-purple-100"
      [class.font-semibold]="isSelected"
      [class.bg-purple-50]="isSelected"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class BaseSelectItemComponent {
  @Input() value: any = '';

  // Propiedad para saber si es el item seleccionado actualmente
  isSelected = false;

  // CORRECCIÓN: Emite un evento hacia el padre en lugar de inyectarlo
  @Output() itemClicked = new EventEmitter<void>();

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  // Obtiene el texto que está dentro de las etiquetas <base-select-item>
  getLabel(): string {
    return this.elementRef.nativeElement.textContent?.trim() || '';
  }

  onClick(): void {
    this.itemClicked.emit();
  }
}

