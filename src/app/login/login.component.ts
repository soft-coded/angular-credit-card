import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // create the form
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  // some error messages to display
  userDoesNotExist = false;
  incorrectPassword = false;

  constructor(private userService: UserService, private router: Router) {}

  // handle submission
  handleFormSubmit() {
    this.userDoesNotExist = false;
    this.incorrectPassword = false;
    // show errors if the form is invalid
    if (this.form.status === 'INVALID') {
      this.form.markAllAsTouched();
      // return without authenticating
      return;
    }

    // if valid, first check if the user exists
    this.userService
      .getUserViaEmail(this.form.value.email!)
      .subscribe((data) => {
        // if the user does not exist, an empty array is returned
        if (data.length === 0) {
          this.userDoesNotExist = true;
          return;
        }
        // if the password does not match, display the error
        if (data[0].password !== this.form.value.password) {
          this.incorrectPassword = true;
          return;
        }
        // redirect to dashboard on successful authentication
        this.router.navigate(['/']);
      });
  }
}
