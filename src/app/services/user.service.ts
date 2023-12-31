import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import User from '../models/user.model';
import DebitCard from '../models/card.model';
import Payment from '../models/payment.model';

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

  addDebitCard(userDetails: User, cardDetails: DebitCard) {
    let cards: DebitCard[] = [];
    if (userDetails.debitCards) {
      cards = userDetails.debitCards;
    }
    cards.push(cardDetails);

    return this.http.patch(
      BACKEND_URL + USERS_ENDPOINT + '/' + userDetails.id,
      { debitCards: cards },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  addPayment(userData: User, paymentData: Payment) {
    let payments: Payment[] = [];
    if (userData.payments) {
      payments = userData.payments;
    }
    payments.push(paymentData);

    return this.http.patch(
      BACKEND_URL + USERS_ENDPOINT + '/' + userData.id,
      { payments },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
