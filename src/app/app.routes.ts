import { Routes } from '@angular/router';
import { Home } from './features/home/home.component';
import { Contact } from './features/contact/contact.component';
import { DefaultLayoutComponent } from './layout/default-Layout.component';
import { AuthLayoutComponent } from './layout/auth-layout.component';
import { Register } from './features/auth/register/register.component';
import {AppLayoutComponent} from './features/dashboard/app-layout.component';
import {DummyComponent} from './features/dashboard/dummy.component';
import {UserDashboardComponent} from './features/dashboard/user/pages/user-dashboard/user-dashboard.component';
import {AdminDashboardComponent} from './features/dashboard/admin/pages/admin-dashboard/admin-dashboard.component';
import {RoleRedirectGuard} from './core/guards/role-redirect-guardian';



export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: Home },
      { path: 'contact', component: Contact },
      { path: 'register', component: Register },
      {
        path: 'dashboard', component: AppLayoutComponent,
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
  }
];
