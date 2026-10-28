import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-hero-table',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './hero-table.html',
})
export class HeroTable {
  readonly heroes = input.required<Hero[]>();
  protected readonly displayedColumns = ['image', 'name', 'fullName', 'publisher', 'actions'];
}
