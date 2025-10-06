import { Routes } from '@angular/router';
import { Home } from './views/home/home.component';
import { DefaultLayoutComponent } from './layout/DefaultLayout.component';
import { AuthLayoutComponent } from './layout/AuthLayout.component';
import { RoleRedirectGuard } from './core/guards/redirectGuardian.guard';
import { DummyComponent } from './views/dashboard/Dummy.component';
import { UserDashboardComponent } from './views/dashboard/user/pages/userDashboard/userDashboard.component';
import { AdminDashboardComponent } from './views/dashboard/admin/pages/adminDashboard/adminDashboard.component';
import { AppLayoutComponent } from './views/dashboard/AppLayout.component';
import { Register } from './views/auth/register/Register.component';
import { Login } from './views/auth/login/Login.component';
import { AdminLayoutComponent } from './layout/admin/AdminLayout.component';


export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '',         component: Home },
      { path: 'register', component: Register },
      { path: 'login',    component: Login },
      {
        path: 'dashboard', component: AppLayoutComponent ,
        children: [
          {
            path: 'redir',
            canActivate: [RoleRedirectGuard],
            component: DummyComponent
          },
          {
            path: 'user',
            component: UserDashboardComponent
          },
          {
            path: 'admin',
            component: AdminDashboardComponent
          }
        ]
      },
      {
        path: 'dummy',
        component: DummyComponent
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      //  { path: 'login', component: "login" },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      //  { path: 'login', component: "login" },
    ]
  }
];
