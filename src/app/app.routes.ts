import { Routes } from '@angular/router';
import { Home } from './features/home/home.component';
import { Contact } from './features/contact/contact.component';
import { DefaultLayoutComponent } from './layout/default-Layout.component';
import { AuthLayoutComponent } from './layout/auth-layout.component';
import { Register } from './features/auth/register/register.component';


export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: Home },
      { path: 'contact', component: Contact },
      { path: 'dashboard', component: Contact },
      { path: 'register', component: Register },
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
