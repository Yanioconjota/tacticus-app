import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly PLAYER_API_KEY = 'tacticus_player_api_key';
  private readonly OFFICER_API_KEY = 'tacticus_officer_api_key';

  // Signals for both API keys
  private playerApiKeySignal = signal<string | null>(null);
  private officerApiKeySignal = signal<string | null>(null);

  // Computed signals for authentication state
  isAuthenticated = computed(() => !!this.playerApiKeySignal());
  hasOfficerAccess = computed(() => !!this.officerApiKeySignal());

  // Getters for API keys
  get playerApiKey(): string | null {
    return this.playerApiKeySignal();
  }

  get officerApiKey(): string | null {
    return this.officerApiKeySignal();
  }

  // Backward compatibility - returns player API key by default
  get apiKey(): string | null {
    return this.playerApiKeySignal();
  }

  constructor() {
    this.loadApiKeysFromStorage();
  }

  /**
   * Set the player API key and save it to localStorage
   */
  setPlayerApiKey(apiKey: string): void {
    if (apiKey.trim()) {
      this.playerApiKeySignal.set(apiKey.trim());
      localStorage.setItem(this.PLAYER_API_KEY, apiKey.trim());
    }
  }

  /**
   * Set the officer API key and save it to localStorage
   */
  setOfficerApiKey(apiKey: string): void {
    if (apiKey.trim()) {
      this.officerApiKeySignal.set(apiKey.trim());
      localStorage.setItem(this.OFFICER_API_KEY, apiKey.trim());
    }
  }

  /**
   * Backward compatibility - sets player API key
   */
  setApiKey(apiKey: string): void {
    this.setPlayerApiKey(apiKey);
  }

  /**
   * Delete both API keys and clear the localStorage
   */
  logout(): void {
    this.playerApiKeySignal.set(null);
    this.officerApiKeySignal.set(null);
    localStorage.removeItem(this.PLAYER_API_KEY);
    localStorage.removeItem(this.OFFICER_API_KEY);
  }

  /**
   * Load both API keys from localStorage
   */
  private loadApiKeysFromStorage(): void {
    const storedPlayerApiKey = localStorage.getItem(this.PLAYER_API_KEY);
    const storedOfficerApiKey = localStorage.getItem(this.OFFICER_API_KEY);

    if (storedPlayerApiKey) {
      this.playerApiKeySignal.set(storedPlayerApiKey);
    }

    if (storedOfficerApiKey) {
      this.officerApiKeySignal.set(storedOfficerApiKey);
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
