import { Component, input, computed, ViewChild, AfterViewInit, effect } from '@angular/core';
import { GuildRaid, RaidEntry } from '../../../../../core/models/guild-raid.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-guild-raid',
  imports: [DatePipe, DecimalPipe, MatCardModule, MatTableModule, MatChipsModule, MatIconModule, MatDividerModule, MatProgressBarModule, MatPaginatorModule],
  templateUrl: './guild-raid.component.html',
  styleUrl: './guild-raid.component.scss'
})
export class GuildRaidComponent implements AfterViewInit {
  raidData = input<GuildRaid | null>(null);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Table data source for pagination
  dataSource = new MatTableDataSource<RaidEntry>();

  constructor() {
    // Update data source when raid data changes
    effect(() => {
      const entries = this.raidData()?.entries || [];
      this.dataSource.data = entries;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Computed statistics for raid overview
  raidStats = computed(() => {
    const raid = this.raidData();
    if (!raid?.entries) return null;

    const totalEntries = raid.entries.length;
    const totalDamage = raid.entries.reduce((sum, entry) => sum + entry.damageDealt, 0);
    const averageDamage = totalEntries > 0 ? totalDamage / totalEntries : 0;
    const uniqueUsers = new Set(raid.entries.map(entry => entry.userId)).size;

    // Tier distribution
    const tierStats = raid.entries.reduce((acc, entry) => {
      acc[entry.tier] = (acc[entry.tier] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return {
      totalEntries,
      totalDamage,
      averageDamage,
      uniqueUsers,
      tierStats
    };
  });

  // Top damage dealers
  topDamageEntries = computed(() => {
    const raid = this.raidData();
    if (!raid?.entries) return [];
    
    return [...raid.entries]
      .sort((a, b) => b.damageDealt - a.damageDealt)
      .slice(0, 10);
  });

  // Rarity distribution
  rarityStats = computed(() => {
    const raid = this.raidData();
    if (!raid?.entries) return null;

    return raid.entries.reduce((acc, entry) => {
      acc[entry.rarity] = (acc[entry.rarity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  });

  // Table columns for entries
  displayedColumns = ['tier', 'userId', 'damageDealt', 'rarity', 'encounterType', 'completedOn'];

  // Get damage percentage for progress bars
  getDamagePercentage(entry: RaidEntry): number {
    if (entry.maxHp === 0) return 0;
    const damageDealt = entry.maxHp - entry.remainingHp;
    return Math.min((damageDealt / entry.maxHp) * 100, 100);
  }

  // Get rarity color
  getRarityColor(rarity: string): string {
    const colors = {
      'Common': '#9e9e9e',
      'Uncommon': '#4caf50',
      'Rare': '#2196f3',
      'Epic': '#9c27b0',
      'Legendary': '#ff9800'
    };
    return colors[rarity as keyof typeof colors] || '#9e9e9e';
  }

  // Helper methods for template
  getObjectKeys(obj: Record<string, any>): string[] {
    return Object.keys(obj);
  }

  // Convert timestamp to date for display
  formatTimestamp(timestamp: string | number): Date {
    // If it's a string that looks like a timestamp, convert to number
    const numTimestamp = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
    // Convert Unix timestamp (seconds) to milliseconds for JavaScript Date
    return new Date(numTimestamp * 1000);
  }
}
