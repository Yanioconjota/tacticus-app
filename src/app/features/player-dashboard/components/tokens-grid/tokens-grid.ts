import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TokensData } from '../../model/token-data';

@Component({
  selector: 'app-tokens-grid',
  imports: [MatIconModule],
  templateUrl: './tokens-grid.html',
  styleUrl: './tokens-grid.scss'
})
export class TokensGridComponent {
  tokensData = input.required<TokensData>();
}
