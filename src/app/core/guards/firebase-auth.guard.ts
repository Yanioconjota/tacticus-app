import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const firebaseAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user has both officer access and Firebase authentication
  if (authService.hasFirebaseAccess()) {
    return true;
  }

  // Check if user has basic authentication but not Firebase access
  if (authService.isAuthenticated()) {
    // User is logged in but doesn't have Firebase access
    // They might need to enable Firebase auth or don't have officer access
    return false;
  }

  // User is not authenticated at all - redirect to login
  router.navigate(['/login']);
  return false;
};