import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

@Service()
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  register(payload: RegisterPayload) {
    return this.http.post(`${this.apiUrl}/users`, payload);
  }
}
