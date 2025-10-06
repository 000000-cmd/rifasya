import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

export const RoleRedirectGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.currentUser$.pipe(
    take(1),
    map(user => {
      if (user === undefined) {
        // Aún cargando el estado del usuario, previene la navegación
        return false;
      }

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
