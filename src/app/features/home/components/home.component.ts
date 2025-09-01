import { ChangeDetectionStrategy, Component, inject, OnInit, signal, computed, ViewEncapsulation } from '@angular/core';
import { PlayerDashboardComponent } from '../../player-dashboard/player-dashboard/player-dashboard';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Player } from '../../../core/models/player.model';
import { GuildResponse } from '../../../core/models/guild.model';
import { GuildInfoComponent } from './home-tabs/guild-info/guild-info.component';
import { GuildRaid } from '../../../core/models/guild-raid.model';
import { GuildRaidComponent } from './home-tabs/guild-raid/guild-raid.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PlayerDashboardComponent, MatTabsModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, GuildInfoComponent, GuildRaidComponent, LoadingComponent, MatFormFieldModule, MatInputModule, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private router = inject(Router);

  // State signals
  playerData = signal<Player | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  guildData = signal<GuildResponse | null>(null);
  raidData = signal<GuildRaid | null>(null);
  raidSeasonData = signal<GuildRaid | null>(null);
  selectedSeason = signal(1);

  // Computed signals for API key access
  hasOfficerAccess = computed(() =>
    this.authService.hasOfficerAccess()
  );
  
  hasFirebaseAccess = computed(() =>
    this.authService.hasFirebaseAccess()
  );

  ngOnInit(): void {
    this.loadPlayerData();
    if (this.hasOfficerAccess()) {
      this.loadGuildData();
      this.loadRaidData();
    }
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

  loadGuildData(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.apiService.getGuild().subscribe({
      next: (data) => {
        this.guildData.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(error.message);
        this.isLoading.set(false);
      }
    });
  }

  loadRaidData(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.apiService.getCurrentGuildRaid().subscribe({
      next: (data) => {
        this.raidData.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(error.message);
        this.isLoading.set(false);
      }
    });
  }

  loadRaidBySeason(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.apiService.getGuildRaidBySeason(this.selectedSeason()).subscribe({
      next: (data) => {
        this.raidSeasonData.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading raid season data:', error);
        console.error('Full error object:', error);
        this.errorMessage.set(`Raid season error: ${error.message}`);
        this.isLoading.set(false);
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
   * Refresh player data
   */
  refreshData(): void {
    this.loadPlayerData();
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
