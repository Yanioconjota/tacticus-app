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
import { FirebaseAuthService } from '../../../core/services/firebase-auth.service';

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
  private firebaseAuthService = inject(FirebaseAuthService);
  private router = inject(Router);

  // Signals for component state
  playerApiKey = signal('');
  officerApiKey = signal('');
  showOfficerField = signal(false);
  useFirebaseAuth = signal(false);
  firebaseEmail = signal('');
  firebasePassword = signal('');
  isLoading = signal(false);
  errorMessage = signal('');
  showPlayerPassword = signal(false);
  showOfficerPassword = signal(false);
  showFirebasePassword = signal(false);

  async onSubmit(): Promise<void> {
    if (!this.isFormValid()) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      // Set player API key (required)
      this.authService.setPlayerApiKey(this.playerApiKey().trim());

      // Set officer API key if provided
      if (this.showOfficerField() && this.officerApiKey().trim()) {
        this.authService.setOfficerApiKey(this.officerApiKey().trim());
      }

      // Handle Firebase authentication if enabled
      if (this.showOfficerField() && this.useFirebaseAuth()) {
        try {
          await this.firebaseAuthService.signInWithEmailAndPassword(
            this.firebaseEmail().trim(),
            this.firebasePassword()
          );
        } catch (firebaseError: any) {
          this.errorMessage.set(`Firebase authentication failed: ${firebaseError.message}`);
          return;
        }
      }

      this.router.navigate(['/home']);
    } catch (error) {
      this.errorMessage.set('Error during authentication');
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
      this.useFirebaseAuth.set(false);
      this.firebaseEmail.set('');
      this.firebasePassword.set('');
    }
    this.clearErrorMessage();
  }

  onFirebaseAuthToggle(): void {
    this.useFirebaseAuth.update(use => !use);
    if (!this.useFirebaseAuth()) {
      this.firebaseEmail.set('');
      this.firebasePassword.set('');
    }
    this.clearErrorMessage();
  }

  onFirebaseEmailChange(value: string): void {
    this.firebaseEmail.set(value);
    this.clearErrorMessage();
  }

  onFirebasePasswordChange(value: string): void {
    this.firebasePassword.set(value);
    this.clearErrorMessage();
  }

  toggleFirebasePasswordVisibility(): void {
    this.showFirebasePassword.update(show => !show);
  }

  isFormValid(): boolean {
    const playerApiKeyValue = this.playerApiKey().trim();
    
    // Player API key is always required
    if (!playerApiKeyValue) {
      this.errorMessage.set('Player API Key is required');
      return false;
    }

    if (!this.authService.validateApiKey(playerApiKeyValue)) {
      this.errorMessage.set('Player API Key must be at least 10 characters long');
      return false;
    }

    // Validate officer API key if enabled
    if (this.showOfficerField()) {
      const officerApiKeyValue = this.officerApiKey().trim();
      if (officerApiKeyValue && !this.authService.validateApiKey(officerApiKeyValue)) {
        this.errorMessage.set('Officer API Key must be at least 10 characters long');
        return false;
      }

      // Validate Firebase fields if Firebase auth is enabled
      if (this.useFirebaseAuth()) {
        const firebaseEmail = this.firebaseEmail().trim();
        const firebasePassword = this.firebasePassword();

        if (!firebaseEmail) {
          this.errorMessage.set('Firebase email is required when Firebase auth is enabled');
          return false;
        }

        if (!firebasePassword) {
          this.errorMessage.set('Firebase password is required when Firebase auth is enabled');
          return false;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(firebaseEmail)) {
          this.errorMessage.set('Please enter a valid email address');
          return false;
        }
      }
    }

    return true;
  }

  private clearErrorMessage(): void {
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }
}
