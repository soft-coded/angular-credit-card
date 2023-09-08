import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  // only allow the route if user is logged in
  const email = await lastValueFrom(inject(AuthService).userEmail);
  if (email) return true;
  return inject(Router).navigate(['/login']);
};
