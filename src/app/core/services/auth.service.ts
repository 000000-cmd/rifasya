import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpBackend, HttpClient} from '@angular/common/http';
import { DataFetch } from '../api/DataFetch';
import { GET, POST } from '../api/Api';
import { User } from '../models/User.model'; 


@Injectable({ providedIn: "root" })
export class AuthService{
  private currentUserSubject = new BehaviorSubject<User | null | undefined>(undefined);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUser();
  }

  async loadUser(){
    try {
      const response = await GET(new DataFetch("auth/me"));

      if (!response.ok) throw new Error('No session');

      const user: User = await response.json();
      this.currentUserSubject.next(user);

    } catch (e) {
      this.currentUserSubject.next(null);
    }
  }

  async login(credentials: { user: string; password: string }){

    const response = await POST(new DataFetch("auth/login"));
    if(!response.ok) throw new Error('Login fallido');

    const user: User = await response.json();

    this.currentUserSubject.next(user);
    return user;

  }

  async logout() {
    await POST(new DataFetch('auth/logout'));
    this.currentUserSubject.next(null);
  }

  getCurrentUserSync() {
    return this.currentUserSubject.value;
  }
}
