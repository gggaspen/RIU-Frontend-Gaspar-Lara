import { AfterViewInit, DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { startWith } from 'rxjs';

@Directive({
  selector: 'input[appUppercase]',
  host: { '(input)': 'normalize()' },
})
export class UppercaseDirective implements AfterViewInit {
  private readonly input = inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    const control = this.ngControl?.control;
    control?.valueChanges
      .pipe(startWith(control.value), takeUntilDestroyed(this.destroyRef))
      .subscribe(this.normalize);
  }

  protected normalize = (): void => {
    const { value, selectionStart, selectionEnd } = this.input;
    const upper = value.toUpperCase();

    if (upper !== value) {
      this.input.value = upper;
      this.input.setSelectionRange(selectionStart, selectionEnd);
    }

    const control = this.ngControl?.control;
    if (control && control.value !== upper) {
      control.setValue(upper, { emitModelToViewChange: false });
    }
  };
}
