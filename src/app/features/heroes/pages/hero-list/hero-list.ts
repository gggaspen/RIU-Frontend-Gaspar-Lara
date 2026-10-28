import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

import { HeroSearch } from '../../components/hero-search/hero-search';
import { HeroTable } from '../../components/hero-table/hero-table';
import { HeroService } from '../../services/hero.service';

@Component({
  imports: [HeroSearch, HeroTable],
  selector: 'app-hero-list',
  templateUrl: './hero-list.html',
})
export class HeroListPage {
  private readonly heroService = inject(HeroService);

  protected readonly searchId = signal('');
  protected readonly heroes = rxResource({
    params: () => this.searchId(),
    stream: ({ params: id }) =>
      id === ''
        ? this.heroService.getAll()
        : this.heroService.getById(Number(id)).pipe(
            map((hero) => [hero]),
            catchError(() => of([])),
          ),
    defaultValue: [],
  });
}
