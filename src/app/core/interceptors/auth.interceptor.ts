import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const apiKey = authService.apiKey;

  // Add API key to requests to our proxied API endpoints
  if (req.url.includes('/api/v1') && apiKey) {
    const authReq = req.clone({
      setHeaders: {
        'X-API-KEY': apiKey // Correct header format from API docs
      }
    });
    return next(authReq);
  }

  return next(req);
};
