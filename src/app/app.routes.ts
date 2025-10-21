import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/PublicLayout.component';
import { Home } from './views/home/home.component';
import { Login} from './views/auth/login/Login.component';
import { Register} from './views/auth/register/Register.component';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';
import { RoleRedirectGuard} from './core/guards/redirect.guard';
import { adminGuard } from './core/guards/admin.guard';
import { ListEditComponent } from './views/dashboard/admin/pages/adminConfiguration/lists/listConfigPages/ListEdit.component';

export const routes: Routes = [
  // --- Rutas Públicas ---
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: Home, pathMatch: 'full' },
      {
        path: 'login',
        component: Login,
        canActivate: [publicGuard],
        data: { breadcrumb: 'Iniciar Sesión' }
      },
      {
        path: 'register',
        component: Register,
        canActivate: [publicGuard],
        data: { breadcrumb: 'Crear Cuenta' }
      },
      {
        path: 'status',
        title: 'Estado del Servicio',
        loadComponent: () => import('./layout/ServiceStatus.component').then(m => m.ServiceStatusComponent),
        data: { breadcrumb: 'Estado del Servicio' }
      },
    ]
  },

  // --- Rutas Protegidas ---
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/DashboardLayout.component').then(m => m.DashboardLayoutComponent),
    canActivate: [authGuard],
    data: { breadcrumb: 'Dashboard' },
    children: [
      { path: '', canActivate: [RoleRedirectGuard], children:[] },

      // Rutas de Administrador
      {
        path: 'admin',
        canActivate: [adminGuard],
        data: { breadcrumb: 'Administración' },
        children: [
          {
            path: '',
            loadComponent: () => import('./views/dashboard/admin/pages/adminDashboard/adminDashboard.component').then(m => m.AdminDashboardComponent),
          },
          {
            path: 'lists',
            data: { breadcrumb: 'Configuración de Listas' },
            children: [
              {
                path: '',
                loadComponent: () => import('./views/dashboard/admin/pages/adminConfiguration/lists/ListConfiguration.component').then(m => m.ListConfigurationComponent)
              },
              {
                path: ':id',
                loadComponent: () => import('./views/dashboard/admin/pages/adminConfiguration/lists/listConfigPages/ListEdit.component').then(m => m.ListEditComponent),
                data: { breadcrumb: 'Editar' }
              }
            ]
          },
          {
            path: 'constants',
            data: { breadcrumb: 'Constantes' },
            loadComponent: () => import('./views/dashboard/admin/pages/adminConfiguration/constants/ConstantsList.component').then(m => m.ConstantsListComponent)
          }
        ]
      },

      // Rutas de Usuario
      {
        path: 'user',
        data: { breadcrumb: 'Mi Panel' }, // <-- Añadido
        children: [
          { path: '', loadComponent: () => import('./views/dashboard/user/pages/userDashboard/userDashboard.component').then(m => m.UserDashboardComponent) },
        ]
      }
    ]
  },
  {
    path: 'test/:id',
    component: ListEditComponent,
    data: { breadcrumb: 'Prueba' } // <-- Añadido
  },

  { path: '**', redirectTo: '' }
];
