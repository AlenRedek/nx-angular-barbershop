import { FormBuilder } from '@angular/forms';
import dayjs from 'dayjs';

import { Barber, Service } from '@app-core/models';

import { AppointmentFormComponent } from './appointment-form.component';

describe('AppointmentFormComponent', () => {
  let component: AppointmentFormComponent;
  let formBuilder: FormBuilder;
  let formSubmitSpy: jest.SpyInstance;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    component = new AppointmentFormComponent(formBuilder);
    formSubmitSpy = jest.spyOn(component.formSubmit, 'next');
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from all observables', () => {
      component.ngOnDestroy();

      expect(component.isUnsubscribed()).toEqual(true);
    });
  });

  describe('onFormSubmit', () => {
    it('should should emit defined form values', () => {
      const params = {
        barberId: 1,
        serviceId: 1,
        startDate: 1676653200,
      };
      component.appointmentForm.get('time')?.enable();
      component.appointmentForm.patchValue({
        barber: { id: 1 } as Barber,
        service: { id: 1 } as Service,
        time: dayjs('2023-02-17T17:00:00').utc(true),
      });

      component.onFormSubmit();

      expect(formSubmitSpy).toBeCalledWith(params);
    });

    it('should emit undefined form values', () => {
      const params = {
        barberId: undefined,
        serviceId: undefined,
        startDate: undefined,
      };

      component.onFormSubmit();

      expect(formSubmitSpy).toBeCalledWith(params);
    });
  });
});
