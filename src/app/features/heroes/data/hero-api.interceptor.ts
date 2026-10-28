import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, throwError } from 'rxjs';

import { HEROES_API_URL } from '../services/hero.service';
import { HeroInMemoryDb } from './hero-in-memory-db';

export const heroApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method === 'GET' && req.url === HEROES_API_URL) {
    return of(new HttpResponse({ status: 200, body: inject(HeroInMemoryDb).findAll() }));
  }
  const id = req.method === 'GET' && req.url.startsWith(`${HEROES_API_URL}/`)
      ? Number(req.url.slice(HEROES_API_URL.length + 1))
      : NaN;
  if (!Number.isNaN(id)) {
    const hero = inject(HeroInMemoryDb).findById(id);
    return hero
      ? of(new HttpResponse({ status: 200, body: hero }))
      : throwError(() => new HttpErrorResponse({ status: 404, url: req.url }));
  }
  return next(req);
};
