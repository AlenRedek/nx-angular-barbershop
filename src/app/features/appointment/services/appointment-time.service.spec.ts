import { AppointmentData } from '@app-features/appointment/models';

import { AppointmentTimeService } from './appointment-time.service';

describe('AppointmentTimeService', () => {
  let appointmentData: AppointmentData;

  beforeEach(() => {
    appointmentData = {
      barber: {
        workHours: [{ day: 1, startHour: 7, endHour: 15 }],
      },
      date: new Date('2023-01-23'),
      service: { durationMinutes: 30 },
    } as AppointmentData;
  });

  describe('getTimes', () => {
    it('should generate an array of available appointment times', () => {
      const times = AppointmentTimeService.getTimes(appointmentData);

      expect(times.length).toBeGreaterThan(0);
    });

    it('should return an empty array if appointment data contains null value', () => {
      appointmentData.barber = null;

      const times = AppointmentTimeService.getTimes(appointmentData);

      expect(times.length).toEqual(0);
    });
  });
});
