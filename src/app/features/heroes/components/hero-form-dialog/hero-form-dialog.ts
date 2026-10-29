import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Hero, HeroPayload } from '../../models/hero.model';

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

const emptyHeroPayload: HeroPayload = {
  name: '',
  slug: '',
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
    fullName: '',
    alterEgos: '-',
    aliases: ['-'],
    placeOfBirth: '-',
    firstAppearance: '-',
    publisher: null,
    alignment: '-',
  },
  work: { occupation: '-', base: '-' },
  connections: { groupAffiliation: '-', relatives: '-' },
  images: { xs: '', sm: '', md: '', lg: '' },
};

const toHeroPayload = (
  { name, fullName, publisher }: HeroFormValue,
  base: HeroPayload = emptyHeroPayload,
): HeroPayload => ({
  ...base,
  name: name.trim(),
  slug: slugify(name),
  biography: {
    ...base.biography,
    fullName: fullName.trim(),
    publisher: publisher.trim() || null,
  },
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
  protected readonly hero = inject<Hero | null>(MAT_DIALOG_DATA, { optional: true });

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: [this.hero?.name ?? '', [Validators.required, Validators.pattern(/\S/)]],
    fullName: [this.hero?.biography.fullName ?? ''],
    publisher: [this.hero?.biography.publisher ?? ''],
  });

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { id: _id, ...base } = this.hero ?? { id: 0, ...emptyHeroPayload };
    this.dialogRef.close(toHeroPayload(this.form.getRawValue(), base));
  }
}
