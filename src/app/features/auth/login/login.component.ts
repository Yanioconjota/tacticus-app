import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Signals for component state
  playerApiKey = signal('');
  officerApiKey = signal('');
  showOfficerField = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  showPlayerPassword = signal(false);
  showOfficerPassword = signal(false);

  onSubmit(): void {
    const playerApiKeyValue = this.playerApiKey().trim();

    if (!playerApiKeyValue) {
      this.errorMessage.set('Player API Key is required');
      return;
    }

    if (!this.authService.validateApiKey(playerApiKeyValue)) {
      this.errorMessage.set('Player API Key must be at least 10 characters long');
      return;
    }

    // Validate officer API key if enabled
    if (this.showOfficerField()) {
      const officerApiKeyValue = this.officerApiKey().trim();
      if (officerApiKeyValue && !this.authService.validateApiKey(officerApiKeyValue)) {
        this.errorMessage.set('Officer API Key must be at least 10 characters long');
        return;
      }
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      // Set player API key (required)
      this.authService.setPlayerApiKey(playerApiKeyValue);

      // Set officer API key if provided
      if (this.showOfficerField() && this.officerApiKey().trim()) {
        this.authService.setOfficerApiKey(this.officerApiKey().trim());
      }

      this.router.navigate(['/home']);
    } catch (error) {
      this.errorMessage.set('Error saving API Keys');
    } finally {
      this.isLoading.set(false);
    }
  }

  togglePlayerPasswordVisibility(): void {
    this.showPlayerPassword.update(show => !show);
  }

  toggleOfficerPasswordVisibility(): void {
    this.showOfficerPassword.update(show => !show);
  }

  onPlayerApiKeyChange(value: string): void {
    this.playerApiKey.set(value);
    this.clearErrorMessage();
  }

  onOfficerApiKeyChange(value: string): void {
    this.officerApiKey.set(value);
    this.clearErrorMessage();
  }

  onOfficerFieldToggle(): void {
    this.showOfficerField.update(show => !show);
    if (!this.showOfficerField()) {
      this.officerApiKey.set('');
    }
    this.clearErrorMessage();
  }

  private clearErrorMessage(): void {
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }
}
