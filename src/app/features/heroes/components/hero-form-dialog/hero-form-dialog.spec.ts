import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { HEROES_SEED } from '../../data/heroes.seed';
import { Hero } from '../../models/hero.model';
import { HeroFormDialog } from './hero-form-dialog';

describe('HeroFormDialog', () => {
  const close = vi.fn();
  const hero = HEROES_SEED[0];

  const setup = async (data: Hero | null = null) => {
    close.mockClear();
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: { close } },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    });
    const fixture = TestBed.createComponent(HeroFormDialog);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  };

  const write = (el: HTMLElement, value: string) => {
    const input = el.querySelector('input')!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };

  const submit = (el: HTMLElement) => el.querySelector('form')!.dispatchEvent(new Event('submit'));

  it('no cierra si falta el nombre', async () => {
    const el = await setup();

    submit(el);

    expect(close).not.toHaveBeenCalled();
  });

  it('precarga los datos al editar', async () => {
    const el = await setup(hero);

    expect(el.querySelector('h2')?.textContent).toContain('Editar héroe');
    expect(el.querySelector('input')!.value).toBe(hero.name.toUpperCase());
  });

  it('al editar conserva lo que el formulario no muestra', async () => {
    const el = await setup(hero);

    write(el, 'Otro Nombre');
    submit(el);

    const payload = close.mock.calls[0][0];
    expect(payload.name).toBe('OTRO NOMBRE');
    expect(payload.powerstats).toEqual(hero.powerstats);
    expect(payload).not.toHaveProperty('id');
  });
});
