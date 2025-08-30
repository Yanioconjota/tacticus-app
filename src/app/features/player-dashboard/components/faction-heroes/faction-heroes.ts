import { Component, computed, input } from '@angular/core';
import { Unit } from '../../../../core/models/player.model';
import { MatCardModule } from '@angular/material/card';
import { KeyValuePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FactionSectionComponent } from '../faction-section/faction-section';

@Component({
  selector: 'app-faction-heroes',
  imports: [MatCardModule, MatIconModule, KeyValuePipe, FactionSectionComponent],
  templateUrl: './faction-heroes.html',
  styleUrl: './faction-heroes.scss'
})
export class FactionHeroesComponent {
  units = input.required<Unit[]>();

  // Computed signal to group units by faction
  unitsByFaction = computed(() => {
    return this.units().reduce((acc, unit) => {
      const faction = unit.grandAlliance;
      if (!acc[faction]) acc[faction] = [];
      acc[faction].push(unit);
      return acc;
    }, {} as Record<string, Unit[]>);
  });

  getFactionColor(faction: string): string {
    switch (faction) {
      case 'Imperial': return '#1976d2';
      case 'Chaos': return '#d32f2f';
      case 'Xenos': return '#388e3c';
      default: return '#757575';
    }
  }
}
