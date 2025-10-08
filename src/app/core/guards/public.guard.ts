import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, of, from } from 'rxjs';
// 1. Importa el operador 'delay'
import { map, catchError, take, switchMap, finalize, delay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

export const publicGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loadingService = inject(LoadingService);

  return authService.currentUser$.pipe(
    take(1),
    switchMap(user => {
      if (user) {
        return of(router.createUrlTree(['/dashboard']));
      }
      loadingService.show();

      return from(authService.refreshTokenAndSetUser()).pipe(
        map(() => {
          // ÉXITO: Actualiza el mensaje.
          loadingService.updateMessage('Sesión detectada, redirigiendo...');

          return router.createUrlTree(['/dashboard']);
        }),
        delay(500),
        catchError(() => {
          return of(true);
        }),
        finalize(() => {
          loadingService.hide();
        })
      );
    })
  );
};
