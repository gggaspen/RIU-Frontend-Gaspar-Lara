import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HEROES_API_URL, HeroService } from './hero.service';

describe('HeroService', () => {
  it('getAll', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    TestBed.inject(HeroService).getAll().subscribe();

    TestBed.inject(HttpTestingController).expectOne({ method: 'GET', url: HEROES_API_URL });
  });
});
