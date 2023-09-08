import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import User from '../models/user.model';

const BACKEND_URL = 'http://localhost:3000';
const USERS_ENDPOINT = '/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<User[]>(BACKEND_URL + USERS_ENDPOINT);
  }

  addUser(userData: User) {
    return this.http.post(BACKEND_URL + USERS_ENDPOINT, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getUserViaEmail(email: string) {
    return this.http.get<User[]>(
      BACKEND_URL + USERS_ENDPOINT + '?email=' + email
    );
  }
}
