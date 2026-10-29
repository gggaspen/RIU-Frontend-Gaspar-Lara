import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { Hero } from '../../models/hero.model';

@Component({
  imports: [MatButtonModule, MatDialogModule],
  selector: 'app-hero-delete-dialog',
  templateUrl: './hero-delete-dialog.html',
})
export class HeroDeleteDialog {
  protected readonly hero = inject<Hero>(MAT_DIALOG_DATA);
}
