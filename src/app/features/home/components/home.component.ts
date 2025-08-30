import { Component, ViewEncapsulation } from '@angular/core';
import { PlayerDashboardComponent } from '../../player-dashboard/player-dashboard/player-dashboard';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PlayerDashboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
}
