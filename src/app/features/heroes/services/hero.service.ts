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

  getByName(name: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(HEROES_API_URL, { params: { name } });
  }

  create(payload: HeroPayload): Observable<Hero> {
    return this.http.post<Hero>(HEROES_API_URL, payload);
  }

  update(id: HeroId, payload: HeroPayload): Observable<Hero> {
    return this.http.put<Hero>(`${HEROES_API_URL}/${id}`, payload);
  }

  delete(id: HeroId): Observable<void> {
    return this.http.delete<void>(`${HEROES_API_URL}/${id}`);
  }
}
