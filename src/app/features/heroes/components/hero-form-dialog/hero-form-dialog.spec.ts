import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { HeroFormDialog } from './hero-form-dialog';

describe('HeroFormDialog', () => {
  const close = vi.fn();
  let el: HTMLElement;

  beforeEach(async () => {
    close.mockClear();
    TestBed.configureTestingModule({
      providers: [{ provide: MatDialogRef, useValue: { close } }],
    });
    const fixture = TestBed.createComponent(HeroFormDialog);
    await fixture.whenStable();
    el = fixture.nativeElement;
  });

  it('sin nombre no cierra', () => {
    el.querySelector('form')!.dispatchEvent(new Event('submit'));

    expect(close).not.toHaveBeenCalled();
  });

  it('con nombre cierra', () => {
    const name = el.querySelector('input')!;
    name.value = 'Bat Man';
    name.dispatchEvent(new Event('input'));

    el.querySelector('form')!.dispatchEvent(new Event('submit'));

    expect(close).toHaveBeenCalled();
  });
});
