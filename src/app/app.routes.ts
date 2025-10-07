import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/PublicLayout.component';
import { Home } from './views/home/home.component';
import { Register } from './views/auth/register/Register.component';
import { Login } from './views/auth/login/Login.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import {RoleRedirectGuard} from './core/guards/redirect.guard';
import {publicGuard} from './core/guards/public.guard';

export const routes: Routes = [
  // --- Rutas Públicas (usan el PublicLayout) ---
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: Home, pathMatch: 'full' },
      // 2. Aplica el guardián a las rutas de login y registro
      { path: 'login', component: Login, canActivate: [publicGuard] },
      { path: 'register', component: Register, canActivate: [publicGuard] },
    ]
  },

  // --- Rutas Protegidas (usan el DashboardLayout) ---
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/DashboardLayout.component').then(m => m.DashboardLayoutComponent),
    canActivate: [authGuard],
    children: [
      // 1. La ruta de entrada al dashboard. Su único trabajo es activar el RoleRedirectGuard.
      { path: '', canActivate: [RoleRedirectGuard], children:[] },

      // 2. Rutas de Administrador (protegidas por el adminGuard)
      {
        path: 'admin',
        canActivate: [adminGuard],
        children: [
          { path: '', loadComponent: () => import('./views/dashboard/admin/pages/adminDashboard/adminDashboard.component').then(m => m.AdminDashboardComponent) },
          // Aquí añadirías tus otras rutas de admin, ej:
          // { path: 'users', loadComponent: () => import('./views/dashboard/admin/pages/users/users.component').then(m => m.UsersComponent) },
        ]
      },

      // 3. Rutas de Usuario
      {
        path: 'user',
        children: [
          { path: '', loadComponent: () => import('./views/dashboard/user/pages/userDashboard/userDashboard.component').then(m => m.UserDashboardComponent) },
        ]
      }
    ]
  },

  // --- Ruta Fallback (Cualquier otra URL) ---
  { path: '**', redirectTo: '' }
];
