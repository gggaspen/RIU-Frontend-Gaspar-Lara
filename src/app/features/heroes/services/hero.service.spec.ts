import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HEROES_SEED } from '../data/heroes.seed';
import { HeroPayload } from '../models/hero.model';
import { HEROES_API_URL, HeroService } from './hero.service';

describe('HeroService', () => {
  const payload: HeroPayload = HEROES_SEED[0];
  let service: HeroService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(HeroService);
    http = TestBed.inject(HttpTestingController);
  });

  it('getAll hace GET a la api', () => {
    service.getAll().subscribe();

    http.expectOne({ method: 'GET', url: HEROES_API_URL });
  });

  it('create envía el payload por POST', () => {
    service.create(payload).subscribe();

    const req = http.expectOne({ method: 'POST', url: HEROES_API_URL });
    expect(req.request.body).toEqual(payload);
  });

  it('update envía el payload por PUT al id', () => {
    service.update(7, payload).subscribe();

    const req = http.expectOne({ method: 'PUT', url: `${HEROES_API_URL}/7` });
    expect(req.request.body).toEqual(payload);
  });

  it('delete envía DELETE al id', () => {
    service.delete(7).subscribe();

    http.expectOne({ method: 'DELETE', url: `${HEROES_API_URL}/7` });
  });
});
