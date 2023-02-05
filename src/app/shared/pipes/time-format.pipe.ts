import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  public transform(time: dayjs.Dayjs | null, format = 'HH:mm'): string {
    return time?.tz().format(format) ?? 'N/A';
  }
}
