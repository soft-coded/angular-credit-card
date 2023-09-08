import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import User from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // the form with all the validations
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    address: new FormControl(''), // no validations for address mentioned in the problem statement
    accountNumber: new FormControl(''), // no validations for accNo mentioned in the problem statement
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
    password: new FormControl('', Validators.required),
  });
  // error to force email to be unique for each user
  emailAlreadyRegistered = false;

  constructor(private userService: UserService, private router: Router) {}

  // method to handle submission
  handleFormSubmit() {
    // reset the error
    this.emailAlreadyRegistered = false;
    // if the form is invalid, display the errors
    if (this.form.status === 'INVALID') {
      // mark all the FormControls as touched to display any errors
      this.form.markAllAsTouched();
      // return without saving the user
      return;
    }

    // if the form passes all validations, add the user
    // check if the email is already registered
    this.userService
      .getUserViaEmail(this.form.value.email!)
      .subscribe((data) => {
        // returns an empty array if email is not registered
        if (data.length !== 0) {
          this.emailAlreadyRegistered = true;
          return;
        }
        // if not registered, proceed with the registration
        this.userService
          .addUser(this.form.value as User)
          .subscribe(() => this.router.navigate(['/login']));
      });
  }
}
