import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of } from 'rxjs';

import { HEROES_API_URL } from '../services/hero.service';
import { HeroInMemoryDb } from './hero-in-memory-db';

export const heroApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method === 'GET' && req.url === HEROES_API_URL) {
    return of(new HttpResponse({ status: 200, body: inject(HeroInMemoryDb).findAll() }));
  }
  return next(req);
};
