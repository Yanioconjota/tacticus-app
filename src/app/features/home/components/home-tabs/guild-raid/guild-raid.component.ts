import { Component, input } from '@angular/core';
import { GuildRaid } from '../../../../../core/models/guild-raid.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-guild-raid',
  imports: [JsonPipe],
  templateUrl: './guild-raid.component.html',
  styleUrl: './guild-raid.component.scss'
})
export class GuildRaidComponent {
  raidData = input<GuildRaid | null>(null);
}
