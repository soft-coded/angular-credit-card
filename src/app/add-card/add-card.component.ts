import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import DebitCard from '../models/card.model';
import { Router } from '@angular/router';
import User from '../models/user.model';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent implements OnInit, OnDestroy {
  userData: User;
  authSub: Subscription;
  form = new FormGroup({
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(16),
      Validators.minLength(16),
    ]),
    expiryDate: new FormControl('', Validators.required),
    cvv: new FormControl('', [
      Validators.required,
      Validators.maxLength(3),
      Validators.minLength(3),
    ]),
    nameOnCard: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.userEmail.subscribe((email) => {
      this.userService
        .getUserViaEmail(email!)
        .subscribe((data) => (this.userData = data[0]));
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  handleFormSubmit() {
    // return if form is invalid and display the errors
    if (this.form.status === 'INVALID') {
      this.form.markAllAsTouched();
      return;
    }

    // proceed if everything is correct
    this.userService
      .addDebitCard(this.userData, this.form.value as DebitCard)
      .subscribe(() => this.router.navigate(['/']));
  }
}
