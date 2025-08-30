import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./features/player-dashboard/player-dashboard/player-dashboard').then(m => m.PlayerDashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
