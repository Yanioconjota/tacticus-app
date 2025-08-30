import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JsonPipe } from '@angular/common';

import { AuthService } from '../../../../core/services/auth.service';
import { ApiService } from '../../../../core/services/api.service';
import { Player } from '../../../../core/models/player.model';
import { GuildResponse } from '../../../../core/models/guild.model';
import { GuildRaid } from '../../../../core/models/guild-raid.model';

@Component({
  selector: 'app-home-tabs',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    JsonPipe
  ],
  templateUrl: './home-tabs.component.html',
  styleUrl: './home-tabs.component.scss'
})
export class HomeTabsComponent {
  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private http = inject(HttpClient); // For debugging

  // Data signals
  playerData = signal<Player | null>(null);
  guildData = signal<GuildResponse | null>(null);
  raidData = signal<GuildRaid | null>(null);
  raidSeasonData = signal<GuildRaid | null>(null);

  // Loading states
  playerLoading = signal(false);
  guildLoading = signal(false);
  raidLoading = signal(false);
  raidSeasonLoading = signal(false);

  // Error states
  playerError = signal<string | null>(null);
  guildError = signal<string | null>(null);
  raidError = signal<string | null>(null);
  raidSeasonError = signal<string | null>(null);

  // Season input
  selectedSeason = signal(0);

  /**
   * Load player information
   */
  loadPlayer(): void {
    this.playerLoading.set(true);
    this.playerError.set(null);

    this.apiService.getPlayer().subscribe({
      next: (data) => {
        this.playerData.set(data);
        this.playerLoading.set(false);
      },
      error: (error) => {
        this.playerError.set(error.message);
        this.playerLoading.set(false);
      }
    });
  }

  /**
   * Load guild information
   */
  loadGuild(): void {
    this.guildLoading.set(true);
    this.guildError.set(null);

    this.apiService.getGuild().subscribe({
      next: (data) => {
        this.guildData.set(data);
        this.guildLoading.set(false);
      },
      error: (error) => {
        this.guildError.set(error.message);
        this.guildLoading.set(false);
      }
    });
  }

  /**
   * Load current guild raid
   */
  loadCurrentRaid(): void {
    this.raidLoading.set(true);
    this.raidError.set(null);

    this.apiService.getCurrentGuildRaid().subscribe({
      next: (data) => {
        this.raidData.set(data);
        this.raidLoading.set(false);
      },
      error: (error) => {
        this.raidError.set(error.message);
        this.raidLoading.set(false);
      }
    });
  }

  /**
   * Load guild raid by season
   */
  loadRaidBySeason(): void {
    this.raidSeasonLoading.set(true);
    this.raidSeasonError.set(null);

    this.apiService.getGuildRaidBySeason(this.selectedSeason()).subscribe({
      next: (data) => {
        this.raidSeasonData.set(data);
        this.raidSeasonLoading.set(false);
      },
      error: (error) => {
        this.raidSeasonError.set(error.message);
        this.raidSeasonLoading.set(false);
      }
    });
  }

  /**
   * Update selected season
   */
  onSeasonChange(season: string): void {
    const seasonNumber = parseInt(season, 10);
    if (!isNaN(seasonNumber)) {
      this.selectedSeason.set(seasonNumber);
    }
  }

  /**
   * Logout user
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Test raw API call for debugging
   */
  testRawCall(): void {
    console.log('Making raw test call...');
    this.http.get('/api/v1/player', {
      responseType: 'text',
      observe: 'response'
    }).subscribe({
      next: (response) => {
        console.log('Raw test response:', response);
      },
      error: (error) => {
        console.error('Raw test error:', error);
      }
    });
  }
  clearAllData(): void {
    this.playerData.set(null);
    this.guildData.set(null);
    this.raidData.set(null);
    this.raidSeasonData.set(null);

    this.playerError.set(null);
    this.guildError.set(null);
    this.raidError.set(null);
    this.raidSeasonError.set(null);
  }
}
