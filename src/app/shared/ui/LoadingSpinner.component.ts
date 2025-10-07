import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common'; // AsyncPipe sigue siendo necesario
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  // Ya no necesitamos importar NgIf
  imports: [AsyncPipe],
  template: `
    @if (isLoading$ | async) {
      <div class="overlay">
        <div class="spinner-container">
          <div class="spinner"></div>
          @if ((message$ | async); as message) {
            <p class="message">{{ message }}</p>
          }
        </div>
      </div>
    }
  `,
  styleUrls: ['./styles/LoadingSpinner.component.scss']
})
export class LoadingSpinnerComponent {
  private loadingService = inject(LoadingService);

  isLoading$ = this.loadingService.isLoading$;
  message$ = this.loadingService.message$;
}
