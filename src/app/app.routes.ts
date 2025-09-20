import { Routes } from '@angular/router';
import { Home } from './Views/home/home.component';
import { Contact } from './Views/contact/contact.component';



export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'contact', component: Contact},


    // Ruta vacía → redirige a home
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // Ruta no encontrada → página 404
    { path: '**', component: Home } // luego puedes crear un NotFoundComponent
];
