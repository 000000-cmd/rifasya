import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
/**
 *  Logica Global y tranversal del resto de vistas
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Header Content');

  protected readonly footer = signal('Footer Content')
}
