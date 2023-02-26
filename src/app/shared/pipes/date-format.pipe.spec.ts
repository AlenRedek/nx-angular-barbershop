import dayjs from 'dayjs';

import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe();
  });

  it.each([
    [null, 'N/A', undefined],
    [dayjs('2023-02-17T17:00:00'), '2023-02-17', undefined],
    [dayjs('2023-02-17T17:00:00'), '17:00', 'HH:mm'],
  ])('when date is %p, return %p', (inputDate, formattedDate, format) => {
    const result = pipe.transform(inputDate, format);

    expect(result).toEqual(formattedDate);
  });
});
