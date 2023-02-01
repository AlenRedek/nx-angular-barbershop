import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

import { Appointment, BusyHour, Service, WorkHour } from '@app-core/models';
import { AppointmentData } from '@app-features/appointment/models';

@Injectable({
  providedIn: 'root',
})
export class AppointmentTimeService {
  public static getBusyHours(
    data: AppointmentData,
    appointments: Array<Appointment>,
    services: Array<Service>,
  ): Array<BusyHour> {
    const busyHours = appointments
      .filter((appointment) =>
        dayjs.unix(appointment.startDate).isSame(data.date, 'day'),
      )
      .filter((appointment) =>
        // Service durationMinutes must be defined to prevent an infinite loop
        services.some((service) => service.id === appointment.serviceId),
      )
      .map((appointment) => {
        const service = services.find(
          (service) => service.id === appointment.serviceId,
        ) as Service;
        const startAppointment = dayjs.unix(appointment.startDate);

        return {
          start: startAppointment,
          end: startAppointment.add(service.durationMinutes, 'minutes'),
        };
      });

    return [...busyHours, ...this.getLunchTime(data)];
  }

  public static getTimes(
    data: AppointmentData,
    busyHours: Array<BusyHour>,
  ): Array<dayjs.Dayjs> {
    const { date, service } = data;
    const times: Array<dayjs.Dayjs> = [];
    const workHour = this.getWorkHour(data);

    if (!service || !workHour) {
      return times;
    }

    let time = this.getDateWithHour(dayjs(date), workHour.startHour);

    while (this.isServiceWithinEndWorkHour(time, service, workHour)) {
      const busyHour = this.getBusyHourDuringTime(time, busyHours, service);

      if (busyHour) {
        time = busyHour.end;
      } else {
        times.push(time);
        time = time.add(service.durationMinutes, 'minutes');
      }
    }

    return times;
  }

  private static isServiceWithinEndWorkHour(
    startService: dayjs.Dayjs,
    service: Service,
    workHour: WorkHour,
  ): boolean {
    const endService = startService
      .add(service.durationMinutes, 'minutes')
      .format('Hmm');
    const endWorkHour = this.getDateWithHour(dayjs(), workHour.endHour).format(
      'Hmm',
    );

    return Number(endService) <= Number(endWorkHour);
  }

  private static getBusyHourDuringTime(
    time: dayjs.Dayjs,
    busyHours: Array<BusyHour>,
    service: Service,
  ): BusyHour | undefined {
    return busyHours.find((busyHour) => {
      const startService = time;
      const endService = startService.add(service.durationMinutes, 'minutes');

      return (
        // '[)' includes the start time but excludes the end time
        busyHour.start.isBetween(startService, endService, 'minute', '[)')
      );
    });
  }

  private static getLunchTime(data: AppointmentData): Array<BusyHour> {
    const { lunchTime } = this.getWorkHour(data) ?? {};

    if (!lunchTime) {
      return [];
    }

    const startLunchTime = this.getDateWithHour(
      dayjs(data.date),
      lunchTime.startHour,
    );

    return [
      {
        start: startLunchTime,
        end: startLunchTime.add(lunchTime.durationMinutes, 'minutes'),
      },
    ];
  }

  private static getWorkHour(data: AppointmentData): WorkHour | undefined {
    const { barber, date } = data;
    const dayNumber = dayjs(date).day();

    return barber?.workHours.find((hours) => hours.day === dayNumber);
  }

  private static getDateWithHour(date: dayjs.Dayjs, hour: number): dayjs.Dayjs {
    return dayjs(date).set('hour', hour).set('minute', 0).set('second', 0);
  }
}
