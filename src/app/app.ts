import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AlertContainerComponent} from './shared/ui/alerts/alert-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('rifasya');
}
