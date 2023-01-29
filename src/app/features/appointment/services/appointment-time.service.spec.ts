import { Appointment, BusyHour, LunchTime, Service } from '@app-core/models';
import { AppointmentData } from '@app-features/appointment/models';

import { AppointmentTimeService } from './appointment-time.service';

describe('AppointmentTimeService', () => {
  let appointmentData: AppointmentData;
  let appointments: Array<Appointment>;
  let lunchTime: LunchTime;
  let services: Array<Service>;

  beforeEach(() => {
    lunchTime = {
      startHour: 11,
      durationMinutes: 30,
    };
    appointmentData = {
      barber: {
        workHours: [
          {
            day: 3,
            startHour: 7,
            endHour: 15,
            lunchTime,
          },
        ],
      },
      date: new Date('2023-02-01'),
      service: { durationMinutes: 30 },
    } as AppointmentData;

    appointments = [
      { serviceId: 2, startDate: 1675231200 }, // 01/02 07:00
      { serviceId: 2, startDate: 1675233000 }, // 01/02 07:30
      { serviceId: 3, startDate: 1675254000 }, // 01/02 13:20
      { serviceId: 1, startDate: 1675259400 }, // 01/02 14:50

      { serviceId: 1, startDate: 1675348800 }, // 02/02 15:40
      { serviceId: 2, startDate: 1675351800 }, // 02/02 16:30
    ];
    services = [
      { id: 1, durationMinutes: 20 },
      { id: 2, durationMinutes: 30 },
      { id: 3, durationMinutes: 50 },
    ] as Array<Service>;
  });

  describe('getBusyHours', () => {
    it('should include only the busy hours on the selected date', () => {
      const busyHours = AppointmentTimeService.getBusyHours(
        appointmentData,
        appointments,
        services,
      );

      expect(busyHours.length).toEqual(5);
    });

    it('should NOT include the lunch time', () => {
      appointmentData.barber = null;

      const busyHours = AppointmentTimeService.getBusyHours(
        appointmentData,
        appointments,
        services,
      );

      expect(busyHours.length).toEqual(4);
    });
  });

  describe('getTimes', () => {
    it('should generate an array of available appointment times', () => {
      const busyHours: Array<BusyHour> = [];

      const times = AppointmentTimeService.getTimes(appointmentData, busyHours);

      expect(times.length).toBeGreaterThan(0);
    });

    it('should return an empty array if appointment data contains null value', () => {
      const busyHours: Array<BusyHour> = [];
      appointmentData.barber = null;

      const times = AppointmentTimeService.getTimes(appointmentData, busyHours);

      expect(times.length).toEqual(0);
    });

    it('should exclude appointment times during lunch time', () => {
      const startLunchTime = 1100;
      const endLunchTime = 1130;

      const busyHours = AppointmentTimeService.getBusyHours(
        appointmentData,
        appointments,
        services,
      );
      const times = AppointmentTimeService.getTimes(appointmentData, busyHours);
      const timesDuringLunchTime = times
        .map((time) => Number(time.format('Hmm')))
        .filter((time) => time >= startLunchTime && time < endLunchTime);

      expect(timesDuringLunchTime.length).toEqual(0);
    });
  });
});
