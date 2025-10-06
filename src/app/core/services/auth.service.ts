import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, from } from 'rxjs';
import { DataFetch } from '../api/DataFetch';
import { GET, POST } from '../api/Api';
import { User } from '../models/User.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null | undefined>(undefined);
  public currentUser$ = this.currentUserSubject.asObservable();
  private accessToken: string | null = null;

  public public_user_state: User | null | undefined = undefined;

  constructor() {}

  getAccessToken(): string | null {
    return this.accessToken;
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
    this.accessToken = loginData.accessToken;
    const user: User = {
      id: loginData.id, username: loginData.username, name: loginData.name,
      email: loginData.email, roles: loginData.roles,
    };
    this.currentUserSubject.next(user);
    return user;
  }

  async initializeAuthState(): Promise<boolean> {
    try {
      const refreshResponse = await POST(new DataFetch("auth/refresh"));
      if (!refreshResponse.ok) throw new Error('No active session');

      const tokens: { accessToken: string } = await refreshResponse.json();
      this.accessToken = tokens.accessToken;

      const userResponse = await GET(new DataFetch("auth/me"));
      if (!userResponse.ok) throw new Error('Failed to fetch user');

      const user: User = await userResponse.json();
      this.currentUserSubject.next(user);
      this.public_user_state = user;
    } catch (error) {
      this.accessToken = null;
      this.currentUserSubject.next(null);
      this.public_user_state = null;
    }
    return true;
  }

  async refreshToken(): Promise<{ accessToken: string }> {
    const response = await POST(new DataFetch("auth/refresh"));
    if (!response.ok) throw new Error('Refresh token failed');
    const tokens: { accessToken: string } = await response.json();
    this.accessToken = tokens.accessToken;
    return tokens;
  }

  /**
   * Cierra la sesión del usuario.
   */
  async logout(): Promise<void> {
    try {
      // Llama al backend para invalidar el token, pero no dejes que un fallo
      // en esta llamada impida que el frontend se limpie.
      await POST(new DataFetch('auth/logout'));
    } catch (error) {
      console.error('Logout API call failed, clearing session locally.', error);
    } finally {
      this.currentUserSubject.next(null);
      this.accessToken = null;
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
