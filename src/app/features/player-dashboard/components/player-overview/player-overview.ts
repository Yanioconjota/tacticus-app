import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PlayerData } from '../../../../core/models/player.model';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card';

@Component({
  selector: 'app-player-overview',
  imports: [MatCardModule, MatIconModule, StatCardComponent],
  templateUrl: './player-overview.html',
  styleUrl: './player-overview.scss'
})
export class PlayerOverviewComponent {
  playerData = input.required<PlayerData>();

  // Computed signals
  totalHeroes = computed(() => this.playerData().units.length);

  totalUnitPower = computed(() => {
    return this.playerData().units.reduce((total, unit) => {
      const itemPower = unit.items?.reduce((sum, item) => sum + (item.level || 1), 0) || 0;
      return total + unit.xpLevel + itemPower;
    }, 0);
  });

  inventorySummary = computed(() => {
    const inventory = this.playerData().inventory;
    if (!inventory) return null;

    return {
      items: inventory.items?.length || 0,
      shards: inventory.shards?.reduce((sum, s) => sum + s.amount, 0) || 0,
      forgeBadges: inventory.forgeBadges?.reduce((sum, f) => sum + f.amount, 0) || 0,
      components: inventory.components?.reduce((sum, c) => sum + c.amount, 0) || 0
    };
  });
}
