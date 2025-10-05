import { RenderMode, ServerRoute } from '@angular/ssr';
import { routes } from './app.routes';

// Convertimos las rutas de Angular a ServerRoute para prerender
export const serverRoutes: ServerRoute[] = routes.map(r => ({
  path: r.path || '**',
  renderMode: RenderMode.Prerender
}));