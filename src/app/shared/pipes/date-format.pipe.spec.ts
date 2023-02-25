import dayjs from 'dayjs';

import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe();
  });

  describe('transform', () => {
    const date = dayjs('2023-02-01T17:00:00');

    it.each([
      [null, 'N/A', undefined],
      [date, '2023-02-01', undefined],
      [date, '17:00', 'HH:mm'],
    ])('when date is %p, return %p', (inputDate, formattedDate, format) => {
      const result = pipe.transform(inputDate, format);

      expect(result).toEqual(formattedDate);
    });
  });
});
