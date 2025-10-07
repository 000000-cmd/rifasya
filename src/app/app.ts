import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AlertContainerComponent} from './shared/ui/alerts/alert-container.component';
import {LoadingSpinnerComponent} from './shared/ui/LoadingSpinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertContainerComponent, LoadingSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('rifasya');
}
