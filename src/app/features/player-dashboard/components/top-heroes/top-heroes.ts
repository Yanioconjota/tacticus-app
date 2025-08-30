import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HeroCardComponent } from '../hero-card/hero-card';
import { Unit } from '../../../../core/models/player.model';

@Component({
  selector: 'app-top-heroes',
  imports: [MatCardModule, MatIconModule, HeroCardComponent],
  templateUrl: './top-heroes.html',
  styleUrl: './top-heroes.scss'
})
export class TopHeroesComponent {
  units = input.required<Unit[]>();
  count = input<number>(5);

  // Computed signal to get top units by level
  topUnits = computed(() => {
    return this.units()
      .sort((a, b) => b.xpLevel - a.xpLevel)
      .slice(0, this.count());
  });
}
