import { Appointment, LunchTime, Service } from '@app-core/models';
import { AppointmentData } from '@app-features/appointment/models';

import { AppointmentTimeService } from './appointment-time.service';

describe('AppointmentTimeService', () => {
  let appointmentTimeService: AppointmentTimeService;
  let appointmentData: AppointmentData;
  let appointments: Array<Appointment>;
  let lunchTime: LunchTime;
  let services: Array<Service>;

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-01-31T00:00:00'));

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
      date: new Date('2023-02-01T00:10:00'),
      service: { durationMinutes: 30 },
    } as AppointmentData;

    appointments = [
      { serviceId: 3, startDate: 1675234800 }, // 01/02 07:00 UTC
      { serviceId: 1, startDate: 1675240800 }, // 01/02 08:40 UTC
      { serviceId: 3, startDate: 1675243800 }, // 01/02 09:30 UTC
      { serviceId: 2, startDate: 1675246800 }, // 01/02 10:20 UTC
      { serviceId: 1, startDate: 1675253400 }, // 01/02 12:10 UTC
      { serviceId: 2, startDate: 1675254600 }, // 01/02 12:30 UTC
      { serviceId: 3, startDate: 1675257000 }, // 01/02 13:10 UTC

      { serviceId: 1, startDate: 1675352400 }, // 02/02 15:40 UTC
      { serviceId: 2, startDate: 1675355400 }, // 02/02 16:30 UTC
    ];
    services = [
      { id: 1, durationMinutes: 20 },
      { id: 2, durationMinutes: 30 },
      { id: 3, durationMinutes: 50 },
    ] as Array<Service>;

    appointmentTimeService = new AppointmentTimeService(
      appointmentData,
      appointments,
      services,
    );
  });

  describe('setBusyHours', () => {
    it('should include the busy hours with lunchtime for the selected date', () => {
      expect(appointmentTimeService.busyHours.length).toEqual(8);
    });

    it('should NOT include the busy hour when startDate is NOT defined', () => {
      appointmentTimeService.appointments[0].startDate = undefined;

      appointmentTimeService.setBusyHours();

      expect(appointmentTimeService.busyHours.length).toEqual(7);
    });

    it('should NOT include the lunchtime when barber is NOT defined', () => {
      appointmentTimeService.appointmentData.barber = null;

      appointmentTimeService.setBusyHours();

      expect(appointmentTimeService.busyHours.length).toEqual(7);
    });

    it('should end the lunchtime on predefined hour', () => {
      const lunchTimeAsBusyHour = appointmentTimeService.busyHours.find(
        (busyHour) =>
          busyHour.start.format('Hmm').startsWith(String(lunchTime.startHour)),
      );

      expect(lunchTimeAsBusyHour?.end.format('mm')).toEqual(
        String(lunchTime.durationMinutes),
      );
    });
  });

  describe('getTimes', () => {
    it('should generate an array of available appointment times', () => {
      const times = appointmentTimeService.getTimes();

      expect(times.length).toBeGreaterThan(0);
    });

    it('should NOT return any times when barber is NOT defined', () => {
      appointmentTimeService.appointmentData.barber = null;

      const times = appointmentTimeService.getTimes();

      expect(times.length).toEqual(0);
    });

    it('should include appointment times only for the selected day of month', () => {
      const dayOfMonth = 1;

      const times = appointmentTimeService.getTimes();
      const serviceDays = times
        .map((startService) => Number(startService.format('D')))
        .filter((serviceDay) => serviceDay === dayOfMonth);

      expect(serviceDays.length).toEqual(times.length);
    });

    it.each([
      [[750, 810, 900, 1130, 1150, 1400, 1420, 1440], 20],
      [[750, 900, 1130, 1400, 1430], 30],
      [[750, 1400], 50],
    ])(
      'should include appointment times starting at %p for service duration %p minutes',
      (startServices, durationMinutes) => {
        appointmentTimeService.appointmentData = {
          ...appointmentData,
          service: { durationMinutes },
        } as AppointmentData;

        const times = appointmentTimeService.getTimes();
        const availableTimes = times
          .map((startService) => Number(startService.format('Hmm')))
          .filter((startService) => startServices.includes(startService));

        expect(availableTimes).toEqual(startServices);
      },
    );

    it('should NOT include appointment times during busy hours', () => {
      const startBusyHours = [700, 840, 930, 1020, 1100, 1210, 1230, 1310];

      const times = appointmentTimeService.getTimes();
      const timesDuringBusyHours = times
        .map((startService) => Number(startService.format('Hmm')))
        .filter((startService) => startBusyHours.includes(startService));

      expect(timesDuringBusyHours.length).toEqual(0);
    });
  });
});
