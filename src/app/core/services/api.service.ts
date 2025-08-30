import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Player } from '../models/player.model';
import { GuildResponse } from '../models/guild.model';
import { GuildRaid, ApiError } from '../models/guild-raid.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/v1'; // Back to proxy URL

  /**
   * Gets player information
   */
  getPlayer(): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/player`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Gets guild information
   */
  getGuild(): Observable<GuildResponse> {
    const headers = { 'Cache-Control': 'no-cache' };
    return this.http.get<GuildResponse>(`${this.baseUrl}/guild`, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Gets current guild raid information
   */
  getCurrentGuildRaid(): Observable<GuildRaid> {
    return this.http.get<GuildRaid>(`${this.baseUrl}/guildRaid`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Gets guild raid information by specific season
   */
  getGuildRaidBySeason(season: number): Observable<GuildRaid> {
    return this.http.get<GuildRaid>(`${this.baseUrl}/guildRaid/${season}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles API errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error';

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
      errorMessage = 'Cannot connect to server';
    } else {
      errorMessage = `HTTP Error ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
