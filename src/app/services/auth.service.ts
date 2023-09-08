import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userEmail = new BehaviorSubject<string | null>(null);

  login(email: string) {
    this.userEmail.next(email);
  }

  logout() {
    this.userEmail.next(null);
  }
}
