import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, throwError } from 'rxjs';

import { HeroPayload } from '../models/hero.model';
import { HEROES_API_URL } from '../services/hero.service';
import { HeroInMemoryDb } from './hero-in-memory-db';

export const heroApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method === 'GET' && req.url === HEROES_API_URL) {
    const db = inject(HeroInMemoryDb);
    const name = req.params.get('name');
    const body = name === null ? db.findAll() : db.findByName(name);
    return of(new HttpResponse({ status: 200, body }));
  }
  if (req.method === 'POST' && req.url === HEROES_API_URL) {
    const hero = inject(HeroInMemoryDb).insert(req.body as HeroPayload);
    return of(new HttpResponse({ status: 201, body: hero }));
  }
  const id = (req.method === 'GET' || req.method === 'DELETE') && req.url.startsWith(`${HEROES_API_URL}/`)
      ? Number(req.url.slice(HEROES_API_URL.length + 1))
      : NaN;
  if (!Number.isNaN(id)) {
    const db = inject(HeroInMemoryDb);
    if (req.method === 'DELETE') {
      return db.remove(id)
        ? of(new HttpResponse({ status: 204 }))
        : throwError(() => new HttpErrorResponse({ status: 404, url: req.url }));
    }
    const hero = db.findById(id);
    return hero
      ? of(new HttpResponse({ status: 200, body: hero }))
      : throwError(() => new HttpErrorResponse({ status: 404, url: req.url }));
  }
  return next(req);
};
