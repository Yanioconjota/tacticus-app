import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Add API key to requests to our proxied API endpoints
  if (req.url.includes('/api/v1')) {
    let apiKey: string | null = null;

    // Determine which API key to use based on endpoint
    if (req.url.includes('/guild') || req.url.includes('/guildRaid')) {
      // Officer endpoints need officer API key
      apiKey = authService.officerApiKey;
    } else {
      // Player endpoints need player API key
      apiKey = authService.playerApiKey;
    }

    if (apiKey) {
      const authReq = req.clone({
        setHeaders: {
          'X-API-KEY': apiKey // Correct header format from API docs
        }
      });
      return next(authReq);
    }
  }

  return next(req);
};
