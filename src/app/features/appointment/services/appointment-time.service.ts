import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

import { LunchTime } from '@app-core/models';
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

    let time = this.getDateWithHour(dayjs(date), workHour.startHour);

    while (time.hour() < workHour.endHour) {
      if (this.isTimeDuringLunchTime(time, workHour.lunchTime)) {
        time = time
          .set('hour', workHour.lunchTime.startHour)
          .add(workHour.lunchTime.durationMinutes, 'minutes');
      } else {
        times.push(time);
        time = time.add(service.durationMinutes, 'minutes');
      }
    }

    return times;
  }

  private static isTimeDuringLunchTime(
    time: dayjs.Dayjs,
    lunchTime: LunchTime,
  ): boolean {
    const startLunchTime = this.getDateWithHour(time, lunchTime.startHour);
    const endLunchTime = dayjs(startLunchTime).add(
      lunchTime.durationMinutes,
      'minutes',
    );

    // '[)' includes the start time but excludes the end time
    return time.isBetween(startLunchTime, endLunchTime, 'minute', '[)');
  }

  private static getDateWithHour(date: dayjs.Dayjs, hour: number): dayjs.Dayjs {
    return dayjs(date).set('hour', hour).set('minute', 0).set('second', 0);
  }
}
