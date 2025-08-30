import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const apiKey = authService.apiKey;

  // Only add the API key to requests towards the Tacticus API
  if (req.url.includes('api.tacticusgame.com') && apiKey) {
    const authReq = req.clone({
      setHeaders: {
        'X-API-KEY': apiKey // Adjust according to how the API expects the key
      }
    });
    return next(authReq);
  }

  return next(req);
};
