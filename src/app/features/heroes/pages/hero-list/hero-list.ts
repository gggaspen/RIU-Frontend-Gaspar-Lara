import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { catchError, filter, map, of, switchMap } from 'rxjs';

import { HeroDeleteDialog } from '../../components/hero-delete-dialog/hero-delete-dialog';
import { HeroFormDialog } from '../../components/hero-form-dialog/hero-form-dialog';
import { HeroSearch } from '../../components/hero-search/hero-search';
import { HeroTable } from '../../components/hero-table/hero-table';
import { Hero, HeroPayload } from '../../models/hero.model';
import { HeroService } from '../../services/hero.service';

export const HEROES_PAGE_SIZE = 20;

@Component({
  imports: [MatButtonModule, MatPaginatorModule, HeroSearch, HeroTable],
  selector: 'app-hero-list',
  templateUrl: './hero-list.html',
})
export class HeroListPage {
  private readonly heroService = inject(HeroService);
  private readonly dialog = inject(MatDialog);

  protected readonly pageSize = HEROES_PAGE_SIZE;
  protected readonly searchTerm = signal('');
  protected readonly heroes = rxResource({
    params: () => this.searchTerm(),
    stream: ({ params: term }) =>
      /^\d+$/.test(term)
        ? this.heroService.getById(Number(term)).pipe(
            map((hero) => [hero]),
            catchError(() => of([])),
          )
        : this.heroService.getByName(term),
    defaultValue: [],
  });

  protected readonly pageIndex = linkedSignal({ source: this.searchTerm, computation: () => 0 });
  protected readonly pagedHeroes = computed(() => {
    const start = this.pageIndex() * this.pageSize;
    return this.heroes.value().slice(start, start + this.pageSize);
  });

  protected openCreateDialog(): void {
    this.dialog
      .open<HeroFormDialog, void, HeroPayload>(HeroFormDialog)
      .afterClosed()
      .pipe(
        filter((payload): payload is HeroPayload => payload !== undefined),
        switchMap((payload) => this.heroService.create(payload)),
      )
      .subscribe(() => this.heroes.reload());
  }

  protected openEditDialog(hero: Hero): void {
    this.dialog
      .open<HeroFormDialog, Hero, HeroPayload>(HeroFormDialog, { data: hero })
      .afterClosed()
      .pipe(
        filter((payload): payload is HeroPayload => payload !== undefined),
        switchMap((payload) => this.heroService.update(hero.id, payload)),
      )
      .subscribe(() => this.heroes.reload());
  }

  protected openDeleteDialog(hero: Hero): void {
    this.dialog
      .open<HeroDeleteDialog, Hero, boolean>(HeroDeleteDialog, { data: hero })
      .afterClosed()
      .pipe(
        filter((confirmed) => confirmed === true),
        switchMap(() => this.heroService.delete(hero.id)),
      )
      .subscribe(() => this.heroes.reload());
  }
}
