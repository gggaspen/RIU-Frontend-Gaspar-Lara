import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UppercaseDirective } from './uppercase.directive';

@Component({
  imports: [ReactiveFormsModule, UppercaseDirective],
  template: `
    <input id="bound" appUppercase [formControl]="control" />
    <input id="plain" appUppercase />
  `,
})
class HostComponent {
  readonly control = new FormControl('spider', { nonNullable: true });
}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let control: FormControl<string>;

  const input = (id: string) => fixture.nativeElement.querySelector(`#${id}`) as HTMLInputElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(HostComponent);
    control = fixture.componentInstance.control;
    await fixture.whenStable();
  });

  it('pone en mayúsculas el valor inicial', () => {
    expect(input('bound').value).toBe('SPIDER');
    expect(control.value).toBe('SPIDER');
  });

  it('transforma los valores que vienen del formulario', () => {
    control.setValue('batman');

    expect(input('bound').value).toBe('BATMAN');
    expect(control.value).toBe('BATMAN');
  });
});
