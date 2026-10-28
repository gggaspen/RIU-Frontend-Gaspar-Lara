import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { catchError, filter, map, of, switchMap } from 'rxjs';

import { HeroFormDialog } from '../../components/hero-form-dialog/hero-form-dialog';
import { HeroSearch } from '../../components/hero-search/hero-search';
import { HeroTable } from '../../components/hero-table/hero-table';
import { HeroPayload } from '../../models/hero.model';
import { HeroService } from '../../services/hero.service';

@Component({
  imports: [MatButtonModule, HeroSearch, HeroTable],
  selector: 'app-hero-list',
  templateUrl: './hero-list.html',
})
export class HeroListPage {
  private readonly heroService = inject(HeroService);
  private readonly dialog = inject(MatDialog);

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
}
