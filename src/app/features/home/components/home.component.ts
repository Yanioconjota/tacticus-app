import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { PlayerDashboardComponent } from '../../player-dashboard/player-dashboard/player-dashboard';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Player } from '../../../core/models/player.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PlayerDashboardComponent, MatTabsModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

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
