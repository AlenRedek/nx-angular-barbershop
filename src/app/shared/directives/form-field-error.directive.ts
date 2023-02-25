import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, startWith, Subscription } from 'rxjs';

@Directive({
  selector: '[rdxFormFieldError]',
  standalone: true,
})
export class FormFieldErrorDirective implements OnDestroy {
  @Input('rdxFormFieldError')
  public set rdxFormFieldErrorValue(input: AbstractControl | null) {
    this.control = input;
    this.errorMessage = this.elementRef.nativeElement.innerText;

    this.subscribeToControl();
  }

  private control: AbstractControl | null = null;
  private errorMessage = '';
  private readonly subscriptions: Subscription = new Subscription();

  public constructor(private readonly elementRef: ElementRef) {}

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getControlText(): string {
    return this.elementRef.nativeElement.innerText;
  }

  private subscribeToControl(): void {
    this.subscriptions.add(
      this.control?.valueChanges
        .pipe(debounceTime(500), startWith(null))
        .subscribe(() => this.setControlText()),
    );
  }

  private setControlText(): void {
    const isControlInvalid = this.control?.invalid && this.control?.dirty;

    this.elementRef.nativeElement.innerText = isControlInvalid
      ? this.errorMessage
      : '';
  }
}
