import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'tacticus_api_key';

  private apiKeySignal = signal<string | null>(null);
  isAuthenticated = computed(() => !!this.apiKeySignal());

  get apiKey(): string | null {
    return this.apiKeySignal();
  }

  constructor() {
    this.loadApiKeyFromStorage();
  }

  /**
   * Set the API key and save it to localStorage
   */
  setApiKey(apiKey: string): void {
    if (apiKey.trim()) {
      this.apiKeySignal.set(apiKey.trim());
      localStorage.setItem(this.STORAGE_KEY, apiKey.trim());
    }
  }

  /**
   * Delete the API key and clear the localStorage
   */
  logout(): void {
    this.apiKeySignal.set(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Load the API key from localStorage
   */
  private loadApiKeyFromStorage(): void {
    const storedApiKey = localStorage.getItem(this.STORAGE_KEY);
    if (storedApiKey) {
      this.apiKeySignal.set(storedApiKey);
    }
  }

  /**
   * Validate that the API key has a basic format
   */
  validateApiKey(apiKey: string): boolean {
    // Basic validation - you can adjust it according to the actual format of the API
    return apiKey.trim().length > 10;
  }
}
