import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Service()
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  token = signal<string | null>(localStorage.getItem('token'));

  register(payload: RegisterPayload) {
    return this.http.post(`${this.apiUrl}/users`, payload);
  }

  login(payload: LoginPayload) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, payload);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token.set(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
  }

  isLoggedIn() {
    return this.token() !== null;
  }
}
