import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

import { WorkHour } from '@app-core/models';
import { AppointmentData } from '@app-features/appointment/models';

@Injectable({
  providedIn: 'root',
})
export class AppointmentTimeService {
  public static getTimes(data: AppointmentData): Array<dayjs.Dayjs> {
    const { barber, date, service } = data;
    const dayNumber = dayjs(date).day();
    const times: Array<dayjs.Dayjs> = [];
    const workHour = barber?.workHours.find((hours) => hours.day === dayNumber);

    if (!service || !workHour) {
      return times;
    }

    let time = dayjs(date)
      .set('hour', workHour.startHour)
      .set('minute', 0)
      .set('second', 0);

    while (time.hour() < workHour.endHour) {
      if (!AppointmentTimeService.isTimeDuringLunchTime(time, workHour)) {
        times.push(time);
      }

      time = time.add(service.durationMinutes, 'minutes');
    }

    return times;
  }

  private static isTimeDuringLunchTime(
    time: dayjs.Dayjs,
    workHour: WorkHour,
  ): boolean {
    const startLunchTime = dayjs(time).set(
      'hour',
      workHour.lunchTime.startHour,
    );
    const endLunchTime = dayjs(startLunchTime).add(
      workHour.lunchTime.durationMinutes,
      'minutes',
    );

    return time.isBetween(startLunchTime, endLunchTime, 'minute', '[]');
  }
}
