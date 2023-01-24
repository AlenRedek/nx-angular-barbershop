import { Pipe, PipeTransform } from '@angular/core';
import { Dayjs } from 'dayjs';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  public transform(time: Dayjs | null, format = 'HH:mm'): string | undefined {
    return time?.format(format);
  }
}
