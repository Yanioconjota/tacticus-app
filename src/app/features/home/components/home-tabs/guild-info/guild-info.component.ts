import { Component, input, computed, ViewChild, AfterViewInit, effect, inject } from '@angular/core';
import { GuildResponse } from '../../../../../core/models/guild.model';
import { GuildMember } from '../../../../../core/models/player.model';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { FirebaseService } from '../../../../../core/services/firebase.service';

@Component({
  selector: 'app-guild-info',
  imports: [MatCardModule, MatChipsModule, MatIconModule, MatDividerModule, MatTableModule, MatPaginatorModule, DatePipe],
  templateUrl: './guild-info.component.html',
  styleUrl: './guild-info.component.scss'
})
export class GuildInfoComponent implements AfterViewInit {
  guildData = input<GuildResponse | null>(null);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Table data source for pagination
  membersDataSource = new MatTableDataSource<GuildMember>();

  // Table columns for members
  displayedColumns = ['name', 'level', 'role', 'lastActivityOn'];

  private  firebaseService = inject(FirebaseService);

  constructor() {
    // Update data source when guild data changes
    effect(() => {
      const members = this.guildData()?.guild?.members || [];
      this.membersDataSource.data = members;
    });

    this.firebaseService.getAll('tacticus-users').then((data) => {
      console.log(data);
    });
  }

  ngAfterViewInit() {
    this.membersDataSource.paginator = this.paginator;
  }

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

    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds

    return members.filter(member => {
      // Convert Unix timestamp (seconds) to milliseconds for comparison
      const lastActivityMs = member.lastActivityOn * 1000;
      return lastActivityMs >= sevenDaysAgo;
    }).length;
  });

  // Convert timestamp to date for display
  formatTimestamp(timestamp: number): Date {
    // Convert Unix timestamp (seconds) to milliseconds for JavaScript Date
    return new Date(timestamp * 1000);
  }

  // Get role color for styling
  getRoleColor(role: string): string {
    const colors = {
      'LEADER': '#f44336',
      'OFFICER': '#ff9800',
      'MEMBER': '#4caf50'
    };
    return colors[role as keyof typeof colors] || '#9e9e9e';
  }
}
