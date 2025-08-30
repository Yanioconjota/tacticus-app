import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Signals for component state
  apiKey = signal('');
  isLoading = signal(false);
  errorMessage = signal('');
  showPassword = signal(false);

  onSubmit(): void {
    const apiKeyValue = this.apiKey().trim();

    if (!apiKeyValue) {
      this.errorMessage.set('API Key is required');
      return;
    }

    if (!this.authService.validateApiKey(apiKeyValue)) {
      this.errorMessage.set('API Key must be at least 10 characters long');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    // Set API key and navigate to home
    try {
      this.authService.setApiKey(apiKeyValue);
      this.router.navigate(['/home']);
    } catch (error) {
      this.errorMessage.set('Error saving API Key');
    } finally {
      this.isLoading.set(false);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(show => !show);
  }

  onApiKeyChange(value: string): void {
    this.apiKey.set(value);
    // Clear error when user starts typing
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }
}
