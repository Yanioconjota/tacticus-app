
import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  title = input<string>('Error Loading Data');
  message = input.required<string>();
  showRetryButton = input<boolean>(true);
  retryButtonText = input<string>('Try Again');

  retry = output<void>();

  onRetry() {
    this.retry.emit();
  }
}
