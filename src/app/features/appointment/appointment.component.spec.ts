import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { BarbersApiService } from '@app-core/services';

import { AppointmentComponent } from './appointment.component';

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let barbersApiService: Partial<BarbersApiService>;
  let messageService: Partial<MessageService>;
  let router: Partial<Router>;

  beforeEach(() => {
    barbersApiService = {
      createAppointment: jest.fn().mockResolvedValue({}),
      getAppointments: jest.fn().mockResolvedValue([{ id: 1 }]),
      getBarbers: jest.fn().mockResolvedValue([{ id: 2 }]),
      getServices: jest.fn().mockResolvedValue([{ id: 3 }]),
    };
    messageService = {
      add: jest.fn(),
    };
    router = {
      navigate: jest.fn(),
    };
    component = new AppointmentComponent(
      barbersApiService as BarbersApiService,
      messageService as MessageService,
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

      expect(messageService.add).toBeCalled();
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

      expect(messageService.add).toBeCalled();
    });
  });
});
