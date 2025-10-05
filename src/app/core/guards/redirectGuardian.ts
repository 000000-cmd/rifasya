
import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import { AuthService } from '../services/auth.service';
import {map, take} from 'rxjs';

export const RoleRedirectGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.currentUser$.pipe(
    take(1),
    map(user => {
      if (user === undefined){

        //spinner

        return false;
      }

      if (!user) {
        // no logueado → ir al login
        return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
      }

      if (user.role === 'admin') {
        return router.createUrlTree([`/dashboard/admin/${user.id}`]);
      }

      if (user.role === 'user') {
        return router.createUrlTree([`/dashboard/user/${user.id}`]);
      }

      return router.createUrlTree(['/dummy']);
    })
  );
}
