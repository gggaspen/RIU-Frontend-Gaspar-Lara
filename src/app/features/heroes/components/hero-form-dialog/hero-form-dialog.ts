import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HeroPayload } from '../../models/hero.model';

interface HeroFormValue {
  readonly name: string;
  readonly fullName: string;
  readonly publisher: string;
}

// formatear nombre de heroe valido para url
const slugify = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const toHeroPayload = ({ name, fullName, publisher }: HeroFormValue): HeroPayload => ({
  name: name.trim(),
  slug: slugify(name),
  powerstats: { intelligence: 0, strength: 0, speed: 0, durability: 0, power: 0, combat: 0 },
  appearance: {
    gender: '-',
    race: null,
    height: ['-', '0 cm'],
    weight: ['-', '0 kg'],
    eyeColor: '-',
    hairColor: '-',
  },
  biography: {
    fullName: fullName.trim(),
    alterEgos: '-',
    aliases: ['-'],
    placeOfBirth: '-',
    firstAppearance: '-',
    publisher: publisher.trim() || null,
    alignment: '-',
  },
  work: { occupation: '-', base: '-' },
  connections: { groupAffiliation: '-', relatives: '-' },
  images: { xs: '', sm: '', md: '', lg: '' },
});

@Component({
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  selector: 'app-hero-form-dialog',
  styleUrl: './hero-form-dialog.scss',
  templateUrl: './hero-form-dialog.html',
})
export class HeroFormDialog {
  private readonly dialogRef = inject<MatDialogRef<HeroFormDialog, HeroPayload>>(MatDialogRef);

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.pattern(/\S/)]],
    fullName: [''],
    publisher: [''],
  });

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(toHeroPayload(this.form.getRawValue()));
  }
}
