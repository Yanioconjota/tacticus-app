import { Component, input } from '@angular/core';
import { Unit } from '../../../../core/models/player.model';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-faction-section',
  imports: [MatIconModule, MatChipsModule],
  templateUrl: './faction-section.html',
  styleUrl: './faction-section.scss'
})
export class FactionSectionComponent {
  factionName = input.required<string>();
  units = input.required<Unit[]>();
  factionColor = input.required<string>();
}
