import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../core/models/User.model';
import {AdminSidebarComponent} from './admin/components/AdminSidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminSidebarComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="flex">
        <!-- El Sidebar se muestra solo si el usuario es ADMIN -->
        @if (currentUser$ | async; as user) {
          @if (user.roles.includes('ADMIN')) {
            <app-admin-sidebar
              [isMobileMenuOpen]="isMobileMenuOpen"
              (mobileMenuToggle)="toggleMobileMenu()"
            ></app-admin-sidebar>
          }
        }

        <!-- El contenido principal de la ruta se renderiza aquí -->
        <main class="flex-1">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);
  public currentUser$: Observable<User | null | undefined> = this.authService.currentUser$;

  // Estado para controlar la visibilidad del menú móvil
  public isMobileMenuOpen: boolean = false;

  // Método para cambiar el estado del menú
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
