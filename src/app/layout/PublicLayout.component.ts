import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { LogoComponent } from '../shared/ui/logo.component';
import { ButtonComponent } from '../shared/ui/buttons/button/button.component';
import packageInfo from '../../../package.json'


@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LogoComponent,ButtonComponent],
  template: `
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a routerLink="">
            <logo-component></logo-component>
          </a>
        <nav class="hidden md:flex items-center space-x-8">
          <a href="#" class="text-gray-700 hover:text-purple-600 transition-colors">Rifas Activas</a>
          <a href="#" class="text-gray-700 hover:text-purple-600 transition-colors">Ganadores</a>
          <a href="#" class="text-gray-700 hover:text-purple-600 transition-colors">Cómo Funciona</a>
          <a routerLink="/contact" class="text-gray-700 hover:text-purple-600 transition-colors">Contacto</a></nav>
          <div class="flex items-center space-x-4">
            <a routerLink="/login" data-slot="button" class="items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3 has-[&gt;svg]:px-2.5 hidden sm:flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user w-4 h-4 mr-2" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
              </svg>
              Iniciar Sesión
            </a>
            <a routerLink="/register" data-slot="button" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:ring-ring/50 focus-visible:ring-[3px] text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3 bg-[var(--primary-color)] ">
              Registrarse
            </a>
            <button data-slot="button" class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3 has-[&gt;svg]:px-2.5 md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu w-5 h-5" aria-hidden="true">
                <path d="M4 5h16"></path>
                <path d="M4 12h16"></path>
                <path d="M4 19h16"></path>
              </svg>
            </button>
            </div>
          </div>
        </div>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
    <footer class="bg-gray-900 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid md:grid-cols-4 gap-8">
          <div class="md:col-span-1">
            <div class="flex items-center space-x-2 mb-4">
              <logo-component></logo-component>
            </div>

            <p class="text-gray-400 mb-6">La plataforma de rifas más confiable de Colombia. Premios increíbles, sorteos transparentes y ganadores reales.</p>

            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-purple-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-facebook w-5 h-5" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-purple-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="lucide lucide-twitter w-5 h-5" aria-hidden="true">
                  <path
                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z">
                  </path>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-purple-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-instagram w-5 h-5" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-purple-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-youtube w-5 h-5" aria-hidden="true">
                  <path
                    d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17">
                  </path>
                  <path d="m10 15 5-3-5-3z"></path>
                </svg>
              </a>
            </div>

          </div>
          <div>
            <h4 class="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Rifas Activas</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Ganadores</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Cómo Funciona</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Resultados</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Soporte</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Mantente Informado</h4>
            <p class="text-gray-400 mb-4">Suscríbete y recibe notificaciones de nuevas rifas y ofertas especiales.</p>
            <div class="space-y-3">
              <input type="email" placeholder="Tu email" class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors">
              <app-button variant="heroPrimary" size="full" emphasis="semibold">
                Suscribirse
              </app-button>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">© 2025 RifasYA. Todos los derechos reservados.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <span class="text-gray-400 text-sm">Licencia SEGOB: RF-2024-001</span>
            <span class="text-gray-400 text-sm">Co Hecho en Colombia</span>
            <span class="text-gray-400 text-sm">{{ appVersion }}</span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class PublicLayoutComponent {
  public appVersion: string = `v${packageInfo.version}`;
}
