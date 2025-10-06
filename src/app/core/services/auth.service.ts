import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataFetch } from '../api/DataFetch';
import { GET, POST } from '../api/Api';
import { User } from '../models/User.model';

@Injectable({ providedIn: "root" })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null | undefined>(undefined);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUser();
  }

  async loadUser(): Promise<void> {
    try {
      const response = await GET(new DataFetch("auth/me"));
      if (!response.ok) throw new Error('No session');
      const user: User = await response.json();
      this.currentUserSubject.next(user);
    } catch (e) {
      this.currentUserSubject.next(null);
    }
  }

  async login(credentials: any): Promise<User> {
    const body = {
      usernameOrEmail: credentials.email,
      password: credentials.password
    };
    const response = await POST(new DataFetch("auth/login", body));
    if (!response.ok) throw new Error('Login failed');

    const user: User = await response.json();
    this.currentUserSubject.next(user);
    return user;
  }

  async register(payload: any): Promise<any> {
    const response = await POST(new DataFetch("thirdparty/create", payload));
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    return await response.json();
  }

  async logout(): Promise<void> {
    await POST(new DataFetch('auth/logout'));
    this.currentUserSubject.next(null);
  }
}
