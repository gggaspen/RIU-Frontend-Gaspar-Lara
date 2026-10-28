import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { HeroTable } from '../../components/hero-table/hero-table';
import { HeroService } from '../../services/hero.service';

@Component({
  imports: [HeroTable],
  selector: 'app-hero-list',
  templateUrl: './hero-list.html',
})
export class HeroListPage {
  protected readonly heroes = toSignal(inject(HeroService).getAll(), { initialValue: [] });
}
