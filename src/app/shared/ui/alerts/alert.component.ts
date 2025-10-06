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

  get alertClasses(): object {
    return {
      'bg-green-100 border-green-500 text-green-800': this.alert.type === 'success',
      'bg-red-100 border-red-500 text-red-800': this.alert.type === 'error',
      'bg-yellow-100 border-yellow-500 text-yellow-800': this.alert.type === 'warning',
      'bg-blue-100 border-blue-500 text-blue-800': this.alert.type === 'info',
    };
  }

  get iconClasses(): object {
    return {
      'text-green-500': this.alert.type === 'success',
      'text-red-500': this.alert.type === 'error',
      'text-yellow-500': this.alert.type === 'warning',
      'text-blue-500': this.alert.type === 'info',
    }
  }
}
