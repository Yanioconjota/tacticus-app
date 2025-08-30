import { Component, computed, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Unit } from '../../../../core/models/player.model';

@Component({
  selector: 'app-hero-card',
  imports: [MatChipsModule, MatTooltipModule],
  templateUrl: './hero-card.html',
  styleUrl: './hero-card.scss'
})
export class HeroCardComponent {
  unit = input.required<Unit>();
  showItems = input<boolean>(true);

  // Computed signals
  factionColor = computed(() => {
    const grandAlliance = this.unit().grandAlliance;
    switch (grandAlliance) {
      case 'Imperial': return '#1976d2';
      case 'Chaos': return '#d32f2f';
      case 'Xenos': return '#388e3c';
      default: return '#757575';
    }
  });

  levelClass = computed(() => {
    const level = this.unit().xpLevel;
    if (level >= 35) return 'level-high';
    if (level >= 25) return 'level-med';
    return 'level-low';
  });

  getRarityColor(rarity: string): string {
    switch (rarity.toLowerCase()) {
      case 'legendary': return '#ff8c00';
      case 'epic': return '#9c27b0';
      case 'rare': return '#2196f3';
      case 'uncommon': return '#4caf50';
      default: return '#757575';
    }
  }
}
