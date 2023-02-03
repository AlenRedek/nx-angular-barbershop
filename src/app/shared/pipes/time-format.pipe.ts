import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  public transform(time: dayjs.Dayjs | null, format = 'HH:mm'): string {
    return time?.tz().format(format) ?? 'N/A';
  }
}
