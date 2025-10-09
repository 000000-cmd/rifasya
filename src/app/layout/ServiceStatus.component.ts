import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusService, ApiStatus} from '../core/services/status.service';
import { LogoComponent} from '../shared/ui/logo.component';

@Component({
  selector: 'app-service-status',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  template: `
    <div class="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
      <div class="max-w-2xl w-full text-center">

        <a routerLink="/" class="inline-block mb-8">
          <logo-component></logo-component>
        </a>

        <h1 class="text-3xl font-bold text-gray-800 mb-2">Estado de Nuestros Servicios</h1>
        <p class="text-gray-600 mb-10">Aquí puedes verificar el estado operacional de nuestra plataforma en tiempo real.</p>

        @if (isLoading) {
          <div class="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <div class="flex items-center justify-center space-x-4">
              <svg class="animate-spin h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-xl font-medium text-gray-700">Verificando estado...</span>
            </div>
          </div>
        } @else if (apiStatus) {
          @if (apiStatus.status === 'UP') {
            <div class="bg-green-50 border border-green-300 text-green-800 p-8 rounded-lg shadow-md transition-all">
              <div class="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <h2 class="text-2xl font-semibold mb-2">Todos los sistemas operacionales</h2>
                <p class="text-green-700">Nuestra API está funcionando correctamente.</p>

                @if (apiStatus.version) {
                  <p class="mt-4 text-sm bg-green-200 text-green-900 rounded-full px-3 py-1">
                    Versión de la API: <strong>{{ apiStatus.version }}</strong>
                  </p>
                }
              </div>
            </div>
          } @else if (apiStatus.status === 'DOWN') {
            <div class="bg-red-50 border border-red-300 text-red-800 p-8 rounded-lg shadow-md transition-all">
              <div class="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                <h2 class="text-2xl font-semibold mb-2">Interrupción del servicio</h2>
                <p class="text-red-700">Actualmente estamos experimentando problemas con nuestra API.</p>

                @if (apiStatus.error) {
                  <p class="mt-4 text-sm bg-red-200 text-red-900 rounded-lg px-4 py-2">
                    <strong>Motivo:</strong> {{ apiStatus.error }}
                  </p>
                }
              </div>
            </div>
          }
        }

      </div>
    </div>
  `,
})
export class ServiceStatusComponent implements OnInit {
  private statusService = inject(StatusService);

  public apiStatus: ApiStatus | null = null;
  public isLoading = true;

  async ngOnInit(): Promise<void> {
    this.apiStatus = await this.statusService.checkApiStatus();
    this.isLoading = false;
  }
}
