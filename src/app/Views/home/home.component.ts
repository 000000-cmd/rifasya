import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-home',                // nombre de la etiqueta
  standalone: true,                    // ← standalone obligatorio
  imports: [RouterOutlet],             // Componentes importados que usaras en la vista
  templateUrl: './home.html', // HTML de esta vista
  styleUrl: './home.css'      // estilos locales
})

export class Home{
    title= 'Bienvenido'

    
}
