import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import User from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import Payment from '../models/payment.model';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
})
export class PaymentFormComponent implements OnInit, OnDestroy {
  userData: User;
  authSub: Subscription;
  form = new FormGroup({
    creditCardNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(16),
      Validators.minLength(16),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
    paidUsingCardNumber: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.userEmail.subscribe((email) => {
      this.userService.getUserViaEmail(email!).subscribe((data) => {
        this.userData = data[0];
        if (!data[0].debitCards) this.userData.debitCards = [];
      });
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  // a method to randomly assign a status to a payment
  randomStatus(): 'completed' | 'pending' | 'failed' {
    const arr: ['completed', 'pending', 'failed'] = [
      'completed',
      'pending',
      'failed',
    ];
    return arr[Math.floor(arr.length * Math.random())];
  }

  handleFormSubmit() {
    // handle invalid form
    if (this.form.status === 'INVALID') {
      this.form.markAllAsTouched();
      return;
    }

    // proceed if the form is valid
    this.userService
      .addPayment(this.userData, {
        ...(this.form.value as Payment),
        status: this.randomStatus(), // status is being randomly allotted
      })
      .subscribe(() => this.router.navigate(['/']));
  }
}
