import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs'; // Asegúrate de importar 'filter'

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),                             // 2. Toma el valor real
    map(user => {
      // Si el usuario es 'null', no está logueado.
      if (!user) {
        // Redirige al login, guardando la URL a la que intentaba acceder.
        return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
      }

      // Si hay un usuario, permite el acceso.
      return true;
    })
  );
};
