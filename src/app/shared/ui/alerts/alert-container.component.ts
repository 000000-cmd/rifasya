import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../core/services/alert.service';
import { CustomAlertComponent } from './alert.component';
import { AlertToastComponent } from './alert-toast.component';

@Component({
  selector: 'app-alert-container',
  standalone: true,
  imports: [CommonModule, CustomAlertComponent, AlertToastComponent],
  templateUrl: './alert-container.component.html',
})
export class AlertContainerComponent {
  private alertService = inject(AlertService);
  public alert$ = this.alertService.alert$;

  onClose(): void {
    this.alertService.hide();
  }
}
