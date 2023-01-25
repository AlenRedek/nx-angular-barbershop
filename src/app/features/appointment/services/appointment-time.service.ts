import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';

import { AppointmentData } from '@app-features/appointment/models';

@Injectable({
  providedIn: 'root',
})
export class AppointmentTimeService {
  public static getTimes(data: AppointmentData): Array<dayjs.Dayjs> {
    const { barber, date, service } = data;
    const dayNumber = dayjs(date).day();
    const times: Array<dayjs.Dayjs> = [];
    const workHours = barber?.workHours.find(
      (hours) => hours.day === dayNumber,
    );

    if (!service || !workHours) {
      return times;
    }

    let time = dayjs(date)
      .set('hour', workHours.startHour)
      .set('minute', 0)
      .set('second', 0);

    while (time.hour() < workHours.endHour) {
      times.push(time);

      time = time.add(service.durationMinutes, 'minutes');
    }

    return times;
  }
}
