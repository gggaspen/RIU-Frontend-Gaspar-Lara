import { outputFromObservable } from '@angular/core/rxjs-interop';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  selector: 'app-hero-search',
  templateUrl: './hero-search.html',
})
export class HeroSearch {
  protected readonly control = new FormControl('', { nonNullable: true });

  readonly termChange = outputFromObservable(
    this.control.valueChanges.pipe(
      map((term) => term.trim()),
      debounceTime(300),
      distinctUntilChanged(),
    ),
  );
}
