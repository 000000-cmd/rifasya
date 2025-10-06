import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Alert } from '../../../core/services/alert.service';

@Component({
  selector: 'app-alert-toast',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './alert-toast.component.html',
  styleUrls: ['./alert-toast.component.scss']
})
export class AlertToastComponent {
  @Input() alert!: Alert;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  get alertClasses(): { [key: string]: string } {
    switch (this.alert.type) {
      case 'success':
        return { icon: 'text-green-500' };
      case 'error':
        return { icon: 'text-red-500' };
      default:
        return { icon: 'text-gray-500' };
    }
  }
}
