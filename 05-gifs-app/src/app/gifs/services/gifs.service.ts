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
  // Creates a 3x3 matrix out from the results to display them for Tailwind grid
  // https://flowbite.com/docs/components/gallery/
  trendingGifsMasonryGrid = computed(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    return groups; //[ [g1,g2,g3],[g4,g5,g6] ]
  });
  trendingGifsLoading = signal(false);
  trendingPage = signal(0);
  trendingScrollTop = signal(0);

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
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http
      .get<GiphyResponse>(`${environment.giphyBaseURL}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          offset: this.trendingPage() * 20,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemListToGifList(resp.data);
        this.trendingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
        this.trendingPage.update((page) => page + 1);

        this.trendingGifsLoading.set(false);
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
