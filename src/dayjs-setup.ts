import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
