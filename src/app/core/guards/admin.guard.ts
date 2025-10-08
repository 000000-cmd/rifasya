import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs'; // Asegúrate de importar 'filter'

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),                             // 2. Toma el valor real
    map(user => {
      // Si el usuario tiene el rol 'ADMIN', permite el acceso.
      if (user && user.roles.includes('ADMIN')) {
        return true;
      }

      // Si no es admin, lo redirige a su dashboard de usuario.
      return router.createUrlTree(['/dashboard/user']);
    })
  );
};
