import { Router } from '@angular/router';

import { BarbersApiService } from '@app-core/services';

import { AppointmentComponent } from './appointment.component';

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let barbersApiService: Partial<BarbersApiService>;
  let router: Partial<Router>;
  const consoleErrorSpy = jest.spyOn(console, 'error');

  beforeEach(() => {
    barbersApiService = {
      createAppointment: jest.fn(),
      getAppointments: jest.fn().mockResolvedValue([{ id: 1 }]),
      getBarbers: jest.fn().mockResolvedValue([{ id: 2 }]),
      getServices: jest.fn().mockResolvedValue([{ id: 3 }]),
    };
    router = {
      navigate: jest.fn(),
    };
    component = new AppointmentComponent(
      barbersApiService as BarbersApiService,
      router as Router,
    );
  });

  describe('ngOnInit', () => {
    it('should set the component data', async () => {
      await component.ngOnInit();

      expect(component.appointments).toEqual([{ id: 1 }]);
      expect(component.barbers).toEqual([{ id: 2 }]);
      expect(component.services).toEqual([{ id: 3 }]);
    });

    it('should display error message on API error', async () => {
      jest
        .spyOn(barbersApiService, 'getAppointments')
        .mockRejectedValue(new Error());

      await component.ngOnInit();

      expect(consoleErrorSpy).toBeCalled();
    });
  });

  describe('onFormSubmit', () => {
    it('should create an appointment and navigate to the success page', async () => {
      await component.onFormSubmit({});

      expect(barbersApiService.createAppointment).toBeCalledWith({});
      expect(router.navigate).toBeCalledWith(['success']);
    });

    it('should display error message on API error', async () => {
      jest
        .spyOn(barbersApiService, 'createAppointment')
        .mockRejectedValue(new Error());

      await component.onFormSubmit({});

      expect(consoleErrorSpy).toBeCalled();
    });
  });
});
