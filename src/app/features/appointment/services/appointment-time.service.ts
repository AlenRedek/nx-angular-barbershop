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
    const workHour = this.getWorkHour(data);
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

        return {
          durationMinutes: service.durationMinutes,
          startHour: dayjs.unix(appointment.startDate).hour(),
        };
      });

    return [...busyHours, ...(workHour?.lunchTime ? [workHour.lunchTime] : [])];
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

    while (time.hour() < workHour.endHour) {
      const busyHourDuringTime = this.getBusyHourDuringTime(time, busyHours);

      if (busyHourDuringTime) {
        time = time
          .set('hour', busyHourDuringTime.startHour)
          .add(busyHourDuringTime.durationMinutes, 'minutes');
      } else {
        times.push(time);
        time = time.add(service.durationMinutes, 'minutes');
      }
    }

    return times;
  }

  private static getBusyHourDuringTime(
    time: dayjs.Dayjs,
    busyHours: Array<BusyHour>,
  ): BusyHour | undefined {
    return busyHours.find((busyHour) => {
      const startBusyHour = this.getDateWithHour(time, busyHour.startHour);
      const endBusyHour = dayjs(startBusyHour).add(
        busyHour.durationMinutes,
        'minutes',
      );

      // '[)' includes the start time but excludes the end time
      return time.isBetween(startBusyHour, endBusyHour, 'minute', '[)');
    });
  }

  private static getDateWithHour(date: dayjs.Dayjs, hour: number): dayjs.Dayjs {
    return dayjs(date).set('hour', hour).set('minute', 0).set('second', 0);
  }

  private static getWorkHour(data: AppointmentData): WorkHour | undefined {
    const { barber, date } = data;
    const dayNumber = dayjs(date).day();

    return barber?.workHours.find((hours) => hours.day === dayNumber);
  }
}
