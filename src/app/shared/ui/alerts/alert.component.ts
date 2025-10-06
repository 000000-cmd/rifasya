import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Alert } from '../../../core/services/alert.service';

@Component({
  selector: 'app-custom-alert',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class CustomAlertComponent {
  @Input() alert!: Alert;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  // Mapeo de clases de estilo más limpio y moderno
  get alertClasses(): { [key: string]: string } {
    const baseClasses = {
      iconContainer: 'bg-gray-100',
      icon: 'text-gray-500',
      button: 'bg-gray-600',
      buttonFocus: 'focus:ring-gray-500'
    };

    switch (this.alert.type) {
      case 'success':
        return {
          iconContainer: 'bg-green-100',
          icon: 'text-green-600',
          button: 'bg-green-600',
          buttonFocus: 'focus:ring-green-500'
        };
      case 'error':
        return {
          iconContainer: 'bg-red-100',
          icon: 'text-red-600',
          button: 'bg-red-600',
          buttonFocus: 'focus:ring-red-500'
        };
      // Puedes añadir 'warning' e 'info' si los necesitas
      default:
        return baseClasses;
    }
  }
}
