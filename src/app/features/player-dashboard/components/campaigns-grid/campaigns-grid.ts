import { Component, input } from '@angular/core';
import { Campaign } from '../../../../core/models/player.model';

@Component({
  selector: 'app-campaigns-grid',
  imports: [],
  templateUrl: './campaigns-grid.html',
  styleUrl: './campaigns-grid.scss'
})
export class CampaignsGridComponent {
  campaigns = input.required<Campaign[]>();
}
