import { Component, input } from '@angular/core';

import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.html',
})
export class HeroTable {
  readonly heroes = input.required<Hero[]>();
}
