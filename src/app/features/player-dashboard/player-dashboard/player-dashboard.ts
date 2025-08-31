import { Component, input } from '@angular/core';
import { ProgressSummaryComponent } from '../components/progress-summary/progress-summary';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { PlayerOverviewComponent } from '../components/player-overview/player-overview';
import { TopHeroesComponent } from '../components/top-heroes/top-heroes';
import { FactionHeroesComponent } from '../components/faction-heroes/faction-heroes';
import { Player } from '../../../core/models/player.model';

@Component({
  selector: 'app-player-dashboard',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    LoadingComponent,
    ErrorComponent,
    PlayerOverviewComponent,
    TopHeroesComponent,
    FactionHeroesComponent,
    ProgressSummaryComponent
  ],
  templateUrl: './player-dashboard.html',
  styleUrl: './player-dashboard.scss'
})
export class PlayerDashboardComponent {
  playerData = input<Player | null>();
  isLoading = input<boolean>();
  errorMessage = input<string | null>();
  refreshData = input<() => void>();
}
