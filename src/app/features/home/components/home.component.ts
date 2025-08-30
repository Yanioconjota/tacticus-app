import { Component, inject, signal, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';
import { Player } from '../../../core/models/player.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatGridListModule,
    MatTooltipModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private router = inject(Router);

  // Data signals
  playerData = signal<Player | null>(null);

  // Loading and error states
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

  /**
   * Get power level display color
   */
  getPowerLevelColor(level: number): string {
    if (level >= 45) return 'primary';
    if (level >= 30) return 'accent';
    return 'warn';
  }

  /**
   * Get rarity color for items
   */
  getRarityColor(rarity: string): string {
    switch (rarity.toLowerCase()) {
      case 'legendary': return '#ff8c00';
      case 'epic': return '#9c27b0';
      case 'rare': return '#2196f3';
      case 'uncommon': return '#4caf50';
      default: return '#757575';
    }
  }

  /**
   * Get faction color
   */
  getFactionColor(grandAlliance: string): string {
    switch (grandAlliance) {
      case 'Imperial': return '#1976d2';
      case 'Chaos': return '#d32f2f';
      case 'Xenos': return '#388e3c';
      default: return '#757575';
    }
  }

  /**
   * Get top units by level
   */
  getTopUnits(count: number = 5) {
    const player = this.playerData();
    if (!player?.player?.units) return [];

    return player.player.units
      .sort((a, b) => b.xpLevel - a.xpLevel)
      .slice(0, count);
  }

  /**
   * Get units by faction
   */
  getUnitsByFaction() {
    const player = this.playerData();
    if (!player?.player?.units) return {};

    return player.player.units.reduce((acc, unit) => {
      const faction = unit.grandAlliance;
      if (!acc[faction]) acc[faction] = [];
      acc[faction].push(unit);
      return acc;
    }, {} as Record<string, any[]>);
  }

  /**
   * Calculate total unit power
   */
  getTotalUnitPower(): number {
    const player = this.playerData();
    if (!player?.player?.units) return 0;

    return player.player.units.reduce((total, unit) => {
      const itemPower = unit.items?.reduce((sum, item) => sum + (item.level || 1), 0) || 0;
      return total + unit.xpLevel + itemPower;
    }, 0);
  }

  /**
   * Get inventory summary
   */
  getInventorySummary() {
    const player = this.playerData();
    if (!player?.player?.inventory) return null;

    const inv = player.player.inventory;
    return {
      items: inv.items?.length || 0,
      shards: inv.shards?.reduce((sum, s) => sum + s.amount, 0) || 0,
      forgeBadges: inv.forgeBadges?.reduce((sum, f) => sum + f.amount, 0) || 0,
      components: inv.components?.reduce((sum, c) => sum + c.amount, 0) || 0
    };
  }
}
