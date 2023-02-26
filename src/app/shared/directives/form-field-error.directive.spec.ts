import { ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormFieldErrorDirective } from './form-field-error.directive';

describe('FormFieldErrorDirective', () => {
  let directive: FormFieldErrorDirective;
  let elementRef: ElementRef;

  beforeEach(() => {
    elementRef = new ElementRef({ innerText: 'Error message' });
    directive = new FormFieldErrorDirective(elementRef);
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from all observables', () => {
      directive.ngOnDestroy();

      expect(directive.isUnsubscribed()).toEqual(true);
    });
  });

  describe('set rdxFormFieldErrorValue', () => {
    it('should NOT set the error message when control is valid', () => {
      directive.rdxFormFieldErrorValue = new FormControl();

      expect(directive.getControlText()).toEqual('');
    });

    it('should set the error message when control is NOT valid', () => {
      const control = new FormControl();
      control.markAsDirty();
      control.setErrors({ invalid: true });

      directive.rdxFormFieldErrorValue = control;

      expect(directive.getControlText()).toEqual('Error message');
    });

    it('should NOT initialize the directive when control is NOT defined', () => {
      directive.rdxFormFieldErrorValue = null;

      expect(directive.isControlInitialized()).toEqual(false);
    });
  });
});
