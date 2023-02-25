import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  public transform(date: dayjs.Dayjs | null, format?: string): string {
    return date?.local().format(format) ?? 'N/A';
  }
}
