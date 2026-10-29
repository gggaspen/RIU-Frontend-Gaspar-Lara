import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { heroApiInterceptor } from '../../data/hero-api.interceptor';
import { HEROES_SEED } from '../../data/heroes.seed';
import { HeroListPage } from './hero-list';

describe('HeroListPage', () => {
  const open = vi.fn();
  const hero = HEROES_SEED[0];
  let fixture: ComponentFixture<HeroListPage>;
  let el: HTMLElement;

  const rows = () => el.querySelectorAll('tbody tr');
  const closeWith = (result: unknown) => open.mockReturnValue({ afterClosed: () => of(result) });
  const click = async (selector: string) => {
    el.querySelector<HTMLButtonElement>(selector)!.click();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    open.mockReset();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([heroApiInterceptor])),
        { provide: MatDialog, useValue: { open } },
      ],
    });
    fixture = TestBed.createComponent(HeroListPage);
    await fixture.whenStable();
    el = fixture.nativeElement;
  });

  it('lista los héroes del seed', () => {
    expect(rows()).toHaveLength(HEROES_SEED.length);
  });

  it('crea un héroe', async () => {
    closeWith({ ...hero, name: 'NUEVO HEROE' });

    await click('button');

    expect(rows()).toHaveLength(HEROES_SEED.length + 1);
    expect(el.querySelector('tbody')?.textContent).toContain('NUEVO HEROE');
  });

  it('edita un héroe', async () => {
    closeWith({ ...hero, name: 'EDITADO' });

    await click('button[aria-label="Editar héroe"]');

    expect(open.mock.calls[0][1]).toEqual({ data: expect.objectContaining({ id: hero.id }) });
    expect(rows()).toHaveLength(HEROES_SEED.length);
    expect(el.querySelector('tbody')?.textContent).toContain('EDITADO');
  });

  it('elimina un héroe', async () => {
    closeWith(true);

    await click('button[aria-label="Eliminar héroe"]');

    expect(open.mock.calls[0][1]).toEqual({ data: expect.objectContaining({ id: hero.id }) });
    expect(rows()).toHaveLength(HEROES_SEED.length - 1);
  });
});
