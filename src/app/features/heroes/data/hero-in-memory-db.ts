import { Injectable, signal } from '@angular/core';
import { Hero, HeroId, HeroPayload } from '../models/hero.model';
import { HEROES_SEED } from './heroes.seed';

const normalize = (text: string): string =>
  text.trim().toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');

@Injectable({ providedIn: 'root' })
export class HeroInMemoryDb {
  private readonly heroes = signal<readonly Hero[]>(HEROES_SEED);
  private nextId = Math.max(0, ...HEROES_SEED.map(({ id }) => id)) + 1;

  findAll(): Hero[] {
    return this.heroes().map((hero) => ({ ...hero }));
  }

  findById(id: HeroId): Hero | undefined {
    const hero = this.heroes().find((h) => h.id === id);
    return hero && { ...hero };
  }

  findByName(term: string): Hero[] {
    const normalizedTerm = normalize(term);
    if (!normalizedTerm) {
      return this.findAll();
    }
    return this.heroes()
      .filter(({ name }) => normalize(name).includes(normalizedTerm))
      .map((hero) => ({ ...hero }));
  }

  insert(payload: HeroPayload): Hero {
    const hero: Hero = { ...payload, id: this.nextId++, name: payload.name.toUpperCase() };
    this.heroes.update((heroes) => [...heroes, hero]);
    return { ...hero };
  }
}
