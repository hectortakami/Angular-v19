import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_HISTORY_KEY = 'HISTORY';

// 1. Handles non-existent, null, or corrupted data gracefully
const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const data = localStorage.getItem(GIF_HISTORY_KEY);
  if (!data || data === 'undefined') return {};

  try {
    return JSON.parse(data);
  } catch {
    return {};
  }
};

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);

  // 2. Initial state from helper
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeywords = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  // 3.  Access the signal value using ()
  private _saveToStorage = effect(() => {
    localStorage.setItem(GIF_HISTORY_KEY, JSON.stringify(this.searchHistory()));
  });

  loadTrendingGifs() {
    return this.http
      .get<GiphyResponse>(`${environment.giphyBaseURL}/gifs/trending`, {
        params: { api_key: environment.giphyApiKey, limit: 20 },
      })
      .subscribe((response) => {
        this.trendingGifs.set(
          GifMapper.mapGiphyItemListToGifList(response.data),
        );
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyBaseURL}/gifs/search`, {
        params: { api_key: environment.giphyApiKey, limit: 20, q: query },
      })
      .pipe(
        map(({ data }) => GifMapper.mapGiphyItemListToGifList(data)),
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLocaleLowerCase()]: items,
          }));
        }),
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query.toLocaleLowerCase()] ?? [];
  }
}
