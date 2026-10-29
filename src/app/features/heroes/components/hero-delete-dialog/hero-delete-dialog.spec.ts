import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { HEROES_SEED } from '../../data/heroes.seed';
import { HeroDeleteDialog } from './hero-delete-dialog';

describe('HeroDeleteDialog', () => {
  const close = vi.fn();
  let el: HTMLElement;

  beforeEach(async () => {
    close.mockClear();
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: { close } },
        { provide: MAT_DIALOG_DATA, useValue: HEROES_SEED[0] },
      ],
    });
    const fixture = TestBed.createComponent(HeroDeleteDialog);
    await fixture.whenStable();
    el = fixture.nativeElement;
  });

  it('muestra el nombre del héroe a eliminar', () => {
    expect(el.textContent).toContain(HEROES_SEED[0].name);
  });

  it('confirmar cierra con true', () => {
    el.querySelector<HTMLButtonElement>('button[mat-flat-button]')!.click();

    expect(close).toHaveBeenCalledWith(true);
  });
});
