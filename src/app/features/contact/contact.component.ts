import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'contact',                // nombre de la etiqueta
  standalone: true,                    // ← standalone obligatorio
  imports: [RouterOutlet],             // Componentes importados que usaras en la vista
  templateUrl: './contact.html', // HTML de esta vista
  styleUrl: './contact.css'      // estilos locales
})

export class Contact{
    title= 'Bienvenido'
}
