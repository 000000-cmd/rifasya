import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // 1. Importa las herramientas necesarias
import { BehaviorSubject } from 'rxjs';
import { DataFetch } from '../api/DataFetch';
import { GET, POST } from '../api/Api';
import { User } from '../models/User.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'accessToken';
  private currentUserSubject = new BehaviorSubject<User | null | undefined>(undefined);
  public currentUser$ = this.currentUserSubject.asObservable();
  public public_user_state: User | null | undefined = undefined;

  // 2. Inyecta el PLATFORM_ID para saber en qué entorno se ejecuta el código
  private platformId = inject(PLATFORM_ID);

  constructor() {}

  /**
   * Obtiene el Access Token SÓLO si está en el navegador.
   */
  getAccessToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null; // En el servidor, no hay token.
  }

  /**
   * Inicia sesión con credenciales.
   */
  async login(credentials: any): Promise<User> {
    const response = await POST(new DataFetch("auth/login", {
      usernameOrEmail: credentials.email,
      password: credentials.password
    }));
    if (!response.ok) throw new Error('Login failed');

    const loginData: any = await response.json();

    // 3. Guarda el token SÓLO si está en el navegador
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, loginData.accessToken);
    }

    const user: User = {
      id: loginData.id, username: loginData.username, name: loginData.name,
      email: loginData.email, roles: loginData.roles,
    };
    this.currentUserSubject.next(user);
    return user;
  }

  /**
   * Intenta restaurar la sesión del usuario al iniciar la app.
   * Este método está diseñado para NO fallar y bloquear la app.
   * O tiene éxito y establece el usuario, o falla silenciosamente y establece el usuario a null.
   */
  async initializeAuthState(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      // En el servidor, no hacemos nada y establecemos el estado a "no logueado".
      this.currentUserSubject.next(null);
      return;
    }

    try {
      // Este es el método que ya creamos, que refresca el token Y obtiene los datos del usuario.
      await this.refreshTokenAndSetUser();
    } catch (error) {
      // Si refreshTokenAndSetUser falla (ej. no hay refresh token válido),
      this.currentUserSubject.next(null);
    }
  }


  async refreshToken(): Promise<{ accessToken: string }> {
    // El refresco depende de una cookie HttpOnly, por lo que solo tiene sentido en el navegador.
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.reject('El refresh token solo puede usarse en el navegador.');
    }

    const response = await POST(new DataFetch("auth/refresh"));
    if (!response.ok) throw new Error('Refresh token failed');
    const tokens: { accessToken: string } = await response.json();
    localStorage.setItem(this.TOKEN_KEY, tokens.accessToken);
    return tokens;
  }

  /**
   * Refresca el token, obtiene los datos del usuario y actualiza el estado global.
   * Ideal para guardianes de rutas y para inicializar la sesión.
   */
  async refreshTokenAndSetUser(): Promise<User> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.reject('Solo se puede refrescar la sesión en el navegador.');
    }

    // Paso 1: Refrescar el token
    const refreshResponse = await POST(new DataFetch("auth/refresh"));
    if (!refreshResponse.ok) {
      throw new Error('No hay una sesión activa para refrescar.');
    }
    const tokens: { accessToken: string } = await refreshResponse.json();
    localStorage.setItem(this.TOKEN_KEY, tokens.accessToken);

    // Paso 2: Obtener los datos del usuario con el nuevo token
    const userResponse = await GET(new DataFetch("auth/me"));
    if (!userResponse.ok) {
      // Si esto falla, la sesión es inválida. Limpiamos todo.
      this.logout();
      throw new Error('No se pudieron obtener los datos del usuario tras refrescar el token.');
    }
    const user: User = await userResponse.json();

    // Paso 3: Actualizar el estado de la aplicación
    this.currentUserSubject.next(user);
    this.public_user_state = user;

    return user;
  }

  /**
   * Cierra la sesión del usuario.
   */
  async logout(): Promise<void> {
    try {
      if (isPlatformBrowser(this.platformId)) {
        await POST(new DataFetch('auth/logout'));
      }
    } catch (error) {
      console.error('La llamada a la API de logout falló, limpiando la sesión localmente.', error);
    } finally {
      this.currentUserSubject.next(null);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem(this.TOKEN_KEY);
      }
    }
  }

  /**
   * Registra un nuevo usuario.
   */
  async register(payload: any): Promise<any> {
    const response = await POST(new DataFetch("thirdparty/create", payload));
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    return response.json();
  }
}
