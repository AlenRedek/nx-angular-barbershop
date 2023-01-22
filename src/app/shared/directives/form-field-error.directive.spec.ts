import { ElementRef } from '@angular/core';

import { FormFieldErrorDirective } from './form-field-error.directive';

describe('FormFieldErrorDirective', () => {
  let directive: FormFieldErrorDirective;
  let elementRef: ElementRef;

  beforeEach(() => {
    elementRef = {} as ElementRef;
    directive = new FormFieldErrorDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
