import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  authSub: Subscription;
  isLoggedIn: boolean;
  email: string | null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSub = this.authService.userEmail.subscribe((email) => {
      this.isLoggedIn = !!email;
      this.email = email;
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
