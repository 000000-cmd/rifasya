import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs'; // Asegúrate de importar 'filter'

export const RoleRedirectGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.currentUser$.pipe(
    filter(user => user !== undefined), // 1. Espera
    take(1),                             // 2. Toma el valor real
    map(user => {
      if (!user) {
        // No está logueado, redirige al login
        return router.createUrlTree(['/login']);
      }

      // Si tiene el rol de ADMIN, redirige al dashboard de admin
      if (user.roles && user.roles.includes('ADMIN')) {
        return router.createUrlTree(['/dashboard/admin']);
      }

      // Si tiene cualquier otro rol, redirige al dashboard de usuario
      if (user.roles && user.roles.length > 0) {
        return router.createUrlTree(['/dashboard/user']);
      }

      // Si está logueado pero no tiene roles (caso anómalo), redirige a login
      return router.createUrlTree(['/login']);
    })
  );
};
