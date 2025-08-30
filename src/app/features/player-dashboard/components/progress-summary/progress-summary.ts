import { Component, input } from '@angular/core';
import { Progress } from '../../../../core/models/player.model';
import { computed } from '@angular/core';
import { TokensGridComponent } from '../tokens-grid/tokens-grid';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CampaignsGridComponent } from '../campaigns-grid/campaigns-grid';

@Component({
  selector: 'app-progress-summary',
  imports: [MatCardModule, MatIconModule, CampaignsGridComponent, TokensGridComponent],
  templateUrl: './progress-summary.html',
  styleUrl: './progress-summary.scss'
})
export class ProgressSummaryComponent {
  progress = input.required<Progress>();

  // Computed signal to format tokens data
  tokensData = computed(() => ({
    arena: this.progress().arena,
    guildRaid: this.progress().guildRaid,
    onslaught: this.progress().onslaught,
    salvageRun: this.progress().salvageRun
  }));
}
