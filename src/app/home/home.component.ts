import { Component, OnDestroy, OnInit } from '@angular/core';

import User from '../models/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userData: User | null = null;
  authSub: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.userEmail.subscribe((email) => {
      this.userService.getUserViaEmail(email!).subscribe((user) => {
        this.userData = user[0];
      });
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
