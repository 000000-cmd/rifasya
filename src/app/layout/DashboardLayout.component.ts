import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../core/models/User.model';
import { AdminSidebarComponent } from './admin/components/AdminSidebar.component';
import {BreadcrumbsComponent} from '../shared/ui/Breadcrumbs.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminSidebarComponent, BreadcrumbsComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="flex">
        @if (currentUser$ | async; as user) {
          @if (user.roles.includes('ADMIN')) {
            <app-admin-sidebar></app-admin-sidebar>
          }
        }
        <main class="flex-1">
          <div class="p-6 pt-20 lg:pt-6">
            <app-breadcrumbs></app-breadcrumbs>
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);
  public currentUser$: Observable<User | null | undefined> = this.authService.currentUser$;
}
