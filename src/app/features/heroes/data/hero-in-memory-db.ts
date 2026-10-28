import { Injectable, signal } from '@angular/core';
import { Hero, HeroId } from '../models/hero.model';
import { HEROES_SEED } from './heroes.seed';

@Injectable({ providedIn: 'root' })
export class HeroInMemoryDb {
  private readonly heroes = signal<readonly Hero[]>(HEROES_SEED);

  findAll(): Hero[] {
    return this.heroes().map((hero) => ({ ...hero }));
  }

  findById(id: HeroId): Hero | undefined {
    const hero = this.heroes().find((h) => h.id === id);
    return hero && { ...hero };
  }
}
