import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Player } from '../models/player.model';
import { GuildResponse } from '../models/guild.model';
import { GuildRaid, ApiError } from '../models/guild-raid.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.tacticusgame.com/api/v1';

  /**
   * Get information about the player
   */
  getPlayer(): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/player`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get information about the guild
   */
  getGuild(): Observable<GuildResponse> {
    return this.http.get<GuildResponse>(`${this.baseUrl}/guild`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get information about the current raid
   */
  getCurrentGuildRaid(): Observable<GuildRaid> {
    return this.http.get<GuildRaid>(`${this.baseUrl}/guildRaid`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get information about the raid by season
   */
  getGuildRaidBySeason(season: number): Observable<GuildRaid> {
    return this.http.get<GuildRaid>(`${this.baseUrl}/guildRaid/${season}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Handle errors from the API
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';

    if (error.error?.type) {
      switch (error.error.type) {
        case 'FORBIDDEN':
          errorMessage = 'Invalid API key or no permissions';
          break;
        case 'NOT_FOUND':
          errorMessage = 'Resource not found';
          break;
        case 'UNKNOWN_ERROR':
          errorMessage = 'Internal server error';
          break;
        default:
          errorMessage = 'API error';
      }
    } else if (error.status === 0) {
      errorMessage = 'Cannot connect to the server';
    } else {
      errorMessage = `Error HTTP ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
