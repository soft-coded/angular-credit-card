import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userEmail = new Subject<string | null>();

  constructor() {}

  login(email: string) {
    this.userEmail.next(email);
  }

  logout() {
    this.userEmail.next(null);
  }

  isAuthenticated() {
    return this.userEmail != null;
  }

  getEmail() {
    return this.userEmail;
  }
}
