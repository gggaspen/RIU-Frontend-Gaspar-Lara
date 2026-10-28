import { Component, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [MatFormFieldModule, MatInputModule],
  selector: 'app-hero-search',
  templateUrl: './hero-search.html',
})
export class HeroSearch {
  readonly idChange = output<string>();
}
