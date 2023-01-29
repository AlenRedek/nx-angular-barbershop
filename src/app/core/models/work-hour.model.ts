import { LunchTime } from './lunch-time.model';

export interface WorkHour {
  day: number;
  endHour: number;
  id: number;
  lunchTime: LunchTime;
  startHour: number;
}
