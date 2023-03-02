import { FormBuilder } from '@angular/forms';
import dayjs from 'dayjs';

import { Barber, Service } from '@app-core/models';
import { AppointmentTimeService } from '@app-features/appointment/services';
jest.mock('@app-features/appointment/services');

import { AppointmentFormComponent } from './appointment-form.component';

describe('AppointmentFormComponent', () => {
  let component: AppointmentFormComponent;
  let formBuilder: FormBuilder;
  let formSubmitSpy: jest.SpyInstance;
  let getTimesSpy: jest.SpyInstance;
  const formValues = {
    barber: { id: 1 } as Barber,
    service: { id: 1 } as Service,
    date: new Date('2023-02-17T17:00:00'),
    time: dayjs('2023-02-17T17:00:00').utc(true),
  };

  beforeEach(() => {
    formBuilder = new FormBuilder();
    component = new AppointmentFormComponent(formBuilder);
    formSubmitSpy = jest.spyOn(component.formSubmit, 'next');
    getTimesSpy = jest.spyOn(AppointmentTimeService.prototype, 'getTimes');
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
      component.appointmentForm.patchValue(formValues);

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

  describe('updateTimeControl', () => {
    it.each([
      [[], false],
      [[dayjs()], true],
    ])(
      'when getTimes returns %p, the time field should be enabled: %p',
      (times, isEnabled) => {
        getTimesSpy.mockReturnValue(times);

        component.ngOnInit();
        component.appointmentForm.patchValue(formValues);

        expect(component.appointmentForm.get('time')?.enabled).toEqual(
          isEnabled,
        );
      },
    );
  });
});
