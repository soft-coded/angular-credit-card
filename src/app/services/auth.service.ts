import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userEmail = new Subject<string | null>();

  login(email: string) {
    this.userEmail.next(email);
  }

  logout() {
    this.userEmail.next(null);
  }
}
