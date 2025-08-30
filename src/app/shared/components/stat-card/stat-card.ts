import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stat-card',
  imports: [MatIconModule],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss'
})
export class StatCardComponent {
  icon = input.required<string>();
  value = input.required<string | number>();
  label = input.required<string>();
  backgroundColor = input<string>('rgba(255, 255, 255, 0.1)');
}
