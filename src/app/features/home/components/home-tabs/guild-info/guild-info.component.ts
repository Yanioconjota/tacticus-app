import { Component, input, computed } from '@angular/core';
import { GuildResponse } from '../../../../../core/models/guild.model';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-guild-info',
  imports: [MatCardModule, MatChipsModule, MatIconModule, MatDividerModule],
  templateUrl: './guild-info.component.html',
  styleUrl: './guild-info.component.scss'
})
export class GuildInfoComponent {
  guildData = input<GuildResponse | null>(null);

  // Computed signals for member statistics
  memberStats = computed(() => {
    const guild = this.guildData()?.guild;
    if (!guild?.members) return null;

    const leaders = guild.members.filter(m => m.role === 'LEADER').length;
    const officers = guild.members.filter(m => m.role === 'OFFICER').length;
    const members = guild.members.filter(m => m.role === 'MEMBER').length;
    const totalMembers = guild.members.length;
    
    return {
      leaders,
      officers,
      members,
      totalMembers
    };
  });

  // Average member level
  averageLevel = computed(() => {
    const members = this.guildData()?.guild?.members;
    if (!members || members.length === 0) return 0;
    
    const totalLevel = members.reduce((sum, member) => sum + member.level, 0);
    return Math.round(totalLevel / members.length);
  });

  // Active members (last activity within 7 days)
  activeMembers = computed(() => {
    const members = this.guildData()?.guild?.members;
    if (!members) return 0;
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    return members.filter(member => {
      const lastActivity = new Date(member.lastActivityOn);
      return lastActivity >= sevenDaysAgo;
    }).length;
  });
}
