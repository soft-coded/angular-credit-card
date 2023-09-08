import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  // only allow the route if user is logged in
  return inject(AuthService).isAuthenticated()
    ? true
    : inject(Router).navigate(['/login']);
};
