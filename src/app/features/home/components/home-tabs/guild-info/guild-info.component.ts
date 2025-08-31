import { Component, input } from '@angular/core';
import { GuildResponse } from '../../../../../core/models/guild.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-guild-info',
  imports: [JsonPipe],
  templateUrl: './guild-info.component.html',
  styleUrl: './guild-info.component.scss'
})
export class GuildInfoComponent {
  guildData = input<GuildResponse | null>(null);
}
