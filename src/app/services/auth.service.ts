import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private email: string | null = null;

  constructor() {}

  login(email: string) {
    this.email = email;
    this.isLoggedIn = true;
  }

  logout() {
    this.email = null;
    this.isLoggedIn = false;
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  getEmail() {
    return this.email;
  }
}
