import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { map, catchError, take, switchMap, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

export const publicGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loadingService = inject(LoadingService); // 3. Inyecta el servicio

  return authService.currentUser$.pipe(
    take(1),
    switchMap(user => {
      if (user) {
        return of(router.createUrlTree(['/dashboard']));
      }

      // 4. Muestra el spinner ANTES de iniciar la operación asíncrona
      loadingService.show('Sesión detectada, redirigiendo...');

      return from(authService.refreshTokenAndSetUser()).pipe(
        map(() => {
          return router.createUrlTree(['/dashboard']);
        }),
        catchError(() => {
          return of(true);
        }),
        // 5. Oculta el spinner DESPUÉS de que todo termine (éxito o error)
        finalize(() => {
          loadingService.hide();
        })
      );
    })
  );
};
