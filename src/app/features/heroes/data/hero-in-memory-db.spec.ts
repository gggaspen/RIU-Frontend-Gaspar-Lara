import { TestBed } from '@angular/core/testing';

import { HeroInMemoryDb } from './hero-in-memory-db';
import { HEROES_SEED } from './heroes.seed';

describe('HeroInMemoryDb', () => {
  let db: HeroInMemoryDb;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    db = TestBed.inject(HeroInMemoryDb);
  });

  describe('findAll', () => {
    it('devuelve el seed completo', () => {
      expect(db.findAll()).toHaveLength(HEROES_SEED.length);
    });
  });
});
