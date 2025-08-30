import { Component, inject, signal } from '@angular/core';
import { ProgressSummaryComponent } from '../components/progress-summary/progress-summary';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { PlayerOverviewComponent } from '../components/player-overview/player-overview';
import { TopHeroesComponent } from '../components/top-heroes/top-heroes';
import { FactionHeroesComponent } from '../components/faction-heroes/faction-heroes';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';
import { Player } from '../../../core/models/player.model';

@Component({
  selector: 'app-player-dashboard',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    LoadingComponent,
    ErrorComponent,
    PlayerOverviewComponent,
    TopHeroesComponent,
    FactionHeroesComponent,
    ProgressSummaryComponent
  ],
  templateUrl: './player-dashboard.html',
  styleUrl: './player-dashboard.scss'
})
export class PlayerDashboardComponent {
  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private router = inject(Router);

  // State signals
  playerData = signal<Player | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadPlayerData();
  }

  /**
   * Load player information from API
   */
  loadPlayerData(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.apiService.getPlayer().subscribe({
      next: (data) => {
        this.playerData.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(error.message);
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Refresh player data
   */
  refreshData(): void {
    this.loadPlayerData();
  }

  /**
   * Logout user
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
