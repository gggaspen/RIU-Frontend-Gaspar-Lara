import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Hero, HeroId, HeroPayload } from '../models/hero.model';

export const HEROES_API_URL = '/api/heroes';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(HEROES_API_URL);
  }

  getById(id: HeroId): Observable<Hero> {
    return this.http.get<Hero>(`${HEROES_API_URL}/${id}`);
  }

  create(payload: HeroPayload): Observable<Hero> {
    return this.http.post<Hero>(HEROES_API_URL, payload);
  }
}
