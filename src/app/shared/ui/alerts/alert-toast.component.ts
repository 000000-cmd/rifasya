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

  get alertClasses(): object {
    return {
      'bg-green-600': this.alert.type === 'success',
      'bg-red-600': this.alert.type === 'error',
      'bg-yellow-500': this.alert.type === 'warning',
      'bg-blue-600': this.alert.type === 'info',
    };
  }
}
